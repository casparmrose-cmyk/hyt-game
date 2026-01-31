import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use /data for production (Fly.io volume), fallback to local for development
const dbPath = process.env.NODE_ENV === 'production'
  ? '/data/hyt.db'
  : path.join(__dirname, '../../hyt.db');

let SQL: any;
let db: SqlJsDatabase;

export async function initializeDatabase() {
  SQL = await initSqlJs();

  // Load existing database or create new one
  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      text TEXT NOT NULL,
      options TEXT NOT NULL,
      insight TEXT
    );

    CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY,
      host_id TEXT NOT NULL,
      question_count INTEGER NOT NULL,
      status TEXT NOT NULL,
      current_question_index INTEGER NOT NULL,
      question_ids TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      started_at INTEGER,
      FOREIGN KEY (host_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS room_players (
      room_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      is_host INTEGER NOT NULL,
      is_ready INTEGER NOT NULL,
      has_revealed_consent INTEGER NOT NULL,
      joined_at INTEGER NOT NULL,
      PRIMARY KEY (room_id, user_id),
      FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS answers (
      id TEXT PRIMARY KEY,
      room_id TEXT NOT NULL,
      player_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      answer_id TEXT NOT NULL,
      confidence INTEGER,
      timestamp INTEGER NOT NULL,
      FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
      FOREIGN KEY (player_id) REFERENCES users(id),
      FOREIGN KEY (question_id) REFERENCES questions(id)
    );

  `);

  try {
    db.run('CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status)');
    db.run('CREATE INDEX IF NOT EXISTS idx_answers_room ON answers(room_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id)');
  } catch {
    // Indexes might already exist
  }

  saveDatabase();
  console.log('Database initialized successfully');
}

export function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    writeFileSync(dbPath, buffer);
  }
}

export function getDb(): SqlJsDatabase {
  return db;
}

// Helper functions to mimic better-sqlite3 API
export const dbHelpers = {
  prepare: (sql: string) => ({
    run: (...params: any[]) => {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      stmt.step();
      stmt.free();
      saveDatabase();
      return { changes: db.getRowsModified() };
    },
    get: (...params: any[]) => {
      const stmt = db.prepare(sql);
      stmt.bind(params);

      if (stmt.step()) {
        const row: any = {};
        const columns = stmt.getColumnNames();
        const values = stmt.get(); // Call once and store
        columns.forEach((col: string, idx: number) => {
          row[col] = values[idx];
        });
        stmt.free();
        return row;
      }

      stmt.free();
      return null;
    },
    all: (...params: any[]) => {
      const stmt = db.prepare(sql);
      stmt.bind(params);

      const rows: any[] = [];
      const columns = stmt.getColumnNames();

      while (stmt.step()) {
        const row: any = {};
        const values = stmt.get();
        columns.forEach((col: string, idx: number) => {
          row[col] = values[idx];
        });
        rows.push(row);
      }

      stmt.free();
      return rows;
    }
  })
};

export { db };

// Periodic auto-save every 5 seconds
setInterval(saveDatabase, 5000);

// Save on exit
process.on('exit', saveDatabase);
process.on('SIGINT', () => {
  saveDatabase();
  process.exit();
});
