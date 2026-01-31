import { dbHelpers } from './schema.js';
import { QuestionType, QuestionCategory } from '../types.js';
import { randomUUID } from 'crypto';

interface QuestionSeed {
  type: QuestionType;
  category: QuestionCategory;
  text: string;
  options: Array<{ label: string; value: string }>;
  insight?: string;
}

const questions: QuestionSeed[] = [
  // CATEGORY 1 – CONFESSIONS AND HUMAN EDGES
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: "What's the weirdest thing you've done in public?",
    options: [
      { label: 'A', value: 'Pretended something wasn\'t happening' },
      { label: 'B', value: 'Lied to get out of something' },
      { label: 'C', value: 'Over-shared with a stranger' },
      { label: 'D', value: 'Caused a scene' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: "What's the most embarrassing thing you've done that almost nobody knows?",
    options: [
      { label: 'A', value: 'Romantic rejection moment' },
      { label: 'B', value: 'Work or school failure' },
      { label: 'C', value: 'Social media mishap' },
      { label: 'D', value: 'I\'m taking this to the grave' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: 'What do you feel most guilty about?',
    options: [
      { label: 'A', value: 'Something I said' },
      { label: 'B', value: 'Something I didn\'t say' },
      { label: 'C', value: 'Hurting someone unintentionally' },
      { label: 'D', value: 'Choosing myself over others' }
    ]
  },
  {
    type: QuestionType.SPECTRUM,
    category: QuestionCategory.CONFESSIONS,
    text: 'How much does your personality change depending on who you\'re with?',
    options: [
      { label: 'A', value: 'Not at all' },
      { label: 'B', value: 'Slightly' },
      { label: 'C', value: 'A lot' },
      { label: 'D', value: 'Completely different person' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: 'When do you feel most alone?',
    options: [
      { label: 'A', value: 'In crowds' },
      { label: 'B', value: 'Late at night' },
      { label: 'C', value: 'When things are going well' },
      { label: 'D', value: 'When things fall apart' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: 'What stresses you out more than it probably should?',
    options: [
      { label: 'A', value: 'Money' },
      { label: 'B', value: 'Time pressure' },
      { label: 'C', value: 'Other people\'s opinions' },
      { label: 'D', value: 'Letting people down' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: 'What\'s the last lie you told?',
    options: [
      { label: 'A', value: 'To avoid conflict' },
      { label: 'B', value: 'To protect someone' },
      { label: 'C', value: 'To look better' },
      { label: 'D', value: 'Can\'t remember' }
    ]
  },

  // CATEGORY 2 – FRIENDSHIP AND SOCIAL TRUTH
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.FRIENDSHIP,
    text: 'When do you feel most connected to this group?',
    options: [
      { label: 'A', value: 'Deep conversations' },
      { label: 'B', value: 'Laughing together' },
      { label: 'C', value: 'Doing hard things together' },
      { label: 'D', value: 'Quiet presence' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.FRIENDSHIP,
    text: 'What role do you naturally play in groups?',
    options: [
      { label: 'A', value: 'Leader' },
      { label: 'B', value: 'Mediator' },
      { label: 'C', value: 'Challenger' },
      { label: 'D', value: 'Observer' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.FRIENDSHIP,
    text: 'What\'s the best way to resolve conflict?',
    options: [
      { label: 'A', value: 'Talk immediately' },
      { label: 'B', value: 'Take time first' },
      { label: 'C', value: 'Use humour' },
      { label: 'D', value: 'Avoid it' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.FRIENDSHIP,
    text: 'Do you believe in having one best friend?',
    options: [
      { label: 'A', value: 'Yes, always' },
      { label: 'B', value: 'Sometimes' },
      { label: 'C', value: 'No, it\'s limiting' },
      { label: 'D', value: 'Depends on life stage' }
    ]
  },

  // CATEGORY 3 – VALUES AND WORLDVIEWS
  {
    type: QuestionType.TRADE_OFF,
    category: QuestionCategory.VALUES,
    text: 'Which matters more?',
    options: [
      { label: 'A', value: 'Kindness' },
      { label: 'B', value: 'Honesty' },
      { label: 'C', value: 'Context matters' },
      { label: 'D', value: 'Depends who it affects' }
    ]
  },
  {
    type: QuestionType.TRADE_OFF,
    category: QuestionCategory.VALUES,
    text: 'If you had to choose?',
    options: [
      { label: 'A', value: 'Freedom' },
      { label: 'B', value: 'Safety' },
      { label: 'C', value: 'Balance' },
      { label: 'D', value: 'Depends on threat level' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Are humans mostly…',
    options: [
      { label: 'A', value: 'Good' },
      { label: 'B', value: 'Selfish' },
      { label: 'C', value: 'Shaped by environment' },
      { label: 'D', value: 'Impossible to generalise' }
    ]
  },
  {
    type: QuestionType.TRADE_OFF,
    category: QuestionCategory.VALUES,
    text: 'Are intentions or outcomes more important?',
    options: [
      { label: 'A', value: 'Intentions' },
      { label: 'B', value: 'Outcomes' },
      { label: 'C', value: 'Both equally' },
      { label: 'D', value: 'Depends on harm caused' }
    ]
  },

  // CATEGORY 4 – COGNITIVE BIASES AND DECISION MAKING
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'A bat and a ball cost £1.10 total. The bat costs £1 more than the ball. How much is the ball?',
    options: [
      { label: 'A', value: '10p' },
      { label: 'B', value: '5p' },
      { label: 'C', value: '1p' },
      { label: 'D', value: 'I\'m guessing' }
    ],
    insight: 'Most people guess 10p. The answer is 5p. This shows how intuition can mislead us.'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'You read: "A new study shows eating chocolate reduces stress." What\'s your first thought?',
    options: [
      { label: 'A', value: 'Sounds great, I believe it' },
      { label: 'B', value: 'Who funded the study?' },
      { label: 'C', value: 'Share it immediately' },
      { label: 'D', value: 'Ignore it completely' }
    ],
    insight: 'How we react to news reveals our confirmation bias and critical thinking style.'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'You see a plane crash on the news. Your next thought about flying is…',
    options: [
      { label: 'A', value: 'Flying feels more dangerous' },
      { label: 'B', value: 'Still statistically safe' },
      { label: 'C', value: 'I\'ll avoid it for a while' },
      { label: 'D', value: 'Doesn\'t change anything' }
    ],
    insight: 'This shows availability bias - how recent events shape our risk perception.'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'A doctor says a surgery has a "90% survival rate" vs "10% mortality rate". Which sounds better?',
    options: [
      { label: 'A', value: '90% survival' },
      { label: 'B', value: '10% mortality' },
      { label: 'C', value: 'Same thing' },
      { label: 'D', value: 'Depends on context' }
    ],
    insight: 'Framing effect - the same information feels different based on presentation.'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'Do you decide better…',
    options: [
      { label: 'A', value: 'Fast with intuition' },
      { label: 'B', value: 'Slow with data' },
      { label: 'C', value: 'A mix' },
      { label: 'D', value: 'Depends on stakes' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'Which regret hurts more?',
    options: [
      { label: 'A', value: 'Action' },
      { label: 'B', value: 'Inaction' },
      { label: 'C', value: 'Equal' },
      { label: 'D', value: 'Depends on outcome' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'Would you take a 50% chance to win £150 or lose £100?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only if stakes were higher' },
      { label: 'D', value: 'Depends on my mood' }
    ],
    insight: 'Most people say no - we feel losses twice as strongly as equivalent gains.'
  },

  // CATEGORY 5 – MORAL DILEMMAS
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'A runaway trolley will kill 5 people. You can pull a lever to divert it, killing 1 person instead. Do you pull it?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Depends who the 1 person is' },
      { label: 'D', value: 'I\'d freeze' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'Same situation, but now you must push someone off a bridge to stop the trolley. Do you push?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only in theory' },
      { label: 'D', value: 'Never' }
    ],
    insight: 'Most people say yes to pulling a lever, but no to pushing. Same outcome, different feeling.'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You can steal a drug to save your partner\'s life. Stealing guarantees survival, obeying the law guarantees death. What do you do?',
    options: [
      { label: 'A', value: 'Steal it' },
      { label: 'B', value: 'Don\'t steal it' },
      { label: 'C', value: 'Try another way first' },
      { label: 'D', value: 'I don\'t know' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'Your best friend confesses to a serious crime. What do you do?',
    options: [
      { label: 'A', value: 'Report them' },
      { label: 'B', value: 'Protect them' },
      { label: 'C', value: 'Confront but don\'t report' },
      { label: 'D', value: 'Distance yourself' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'A self-driving car must choose in an unavoidable crash. It should prioritise…',
    options: [
      { label: 'A', value: 'The passenger' },
      { label: 'B', value: 'Minimizing total harm' },
      { label: 'C', value: 'Protecting children' },
      { label: 'D', value: 'Random chance' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'An AI can maximize happiness by subtly manipulating your choices without you knowing. Deploy it?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only with consent' },
      { label: 'D', value: 'Depends who controls it' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You witness someone shoplifting baby formula. They look desperate. Do you report them?',
    options: [
      { label: 'A', value: 'Yes, it\'s theft' },
      { label: 'B', value: 'No, they need help' },
      { label: 'C', value: 'Offer to pay for it' },
      { label: 'D', value: 'Pretend I didn\'t see' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You find £1000 cash on the street with no ID nearby. What do you do?',
    options: [
      { label: 'A', value: 'Keep it' },
      { label: 'B', value: 'Turn it in to police' },
      { label: 'C', value: 'Wait there for someone' },
      { label: 'D', value: 'Donate it to charity' }
    ]
  },

  // CATEGORY 6 – FOOD AND LIFESTYLE
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.LIFESTYLE,
    text: 'What\'s your ultimate comfort food?',
    options: [
      { label: 'A', value: 'Pasta' },
      { label: 'B', value: 'Pizza' },
      { label: 'C', value: 'Curry' },
      { label: 'D', value: 'Something sweet' }
    ]
  },
  {
    type: QuestionType.TRADE_OFF,
    category: QuestionCategory.LIFESTYLE,
    text: 'Sweet or savoury?',
    options: [
      { label: 'A', value: 'Sweet' },
      { label: 'B', value: 'Savoury' },
      { label: 'C', value: 'Both' },
      { label: 'D', value: 'Depends on mood' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.LIFESTYLE,
    text: 'Favourite cuisine long-term?',
    options: [
      { label: 'A', value: 'Italian' },
      { label: 'B', value: 'Japanese' },
      { label: 'C', value: 'Indian' },
      { label: 'D', value: 'Mexican' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.LIFESTYLE,
    text: 'Coffee, tea, or neither?',
    options: [
      { label: 'A', value: 'Coffee' },
      { label: 'B', value: 'Tea' },
      { label: 'C', value: 'Both' },
      { label: 'D', value: 'Neither' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.LIFESTYLE,
    text: 'Favourite sport to watch?',
    options: [
      { label: 'A', value: 'Football' },
      { label: 'B', value: 'Rugby' },
      { label: 'C', value: 'Tennis' },
      { label: 'D', value: 'None' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.LIFESTYLE,
    text: 'Favourite way to exercise?',
    options: [
      { label: 'A', value: 'Gym' },
      { label: 'B', value: 'Running' },
      { label: 'C', value: 'Team sport' },
      { label: 'D', value: 'I avoid it' }
    ]
  },
  {
    type: QuestionType.TRADE_OFF,
    category: QuestionCategory.LIFESTYLE,
    text: 'Mountains or ocean?',
    options: [
      { label: 'A', value: 'Mountains' },
      { label: 'B', value: 'Ocean' },
      { label: 'C', value: 'Both' },
      { label: 'D', value: 'Neither' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.LIFESTYLE,
    text: 'Ideal Saturday?',
    options: [
      { label: 'A', value: 'Productive' },
      { label: 'B', value: 'Social' },
      { label: 'C', value: 'Restful' },
      { label: 'D', value: 'Adventurous' }
    ]
  },

  // CATEGORY 7 – IMAGINATION AND IDENTITY
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'If dictator for a year, you would…',
    options: [
      { label: 'A', value: 'Ban something annoying' },
      { label: 'B', value: 'Force something healthy' },
      { label: 'C', value: 'Redistribute wealth' },
      { label: 'D', value: 'Step down early' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Reincarnated animal?',
    options: [
      { label: 'A', value: 'Dog' },
      { label: 'B', value: 'Cat' },
      { label: 'C', value: 'Bird' },
      { label: 'D', value: 'Dolphin' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Sci-fi technology you want now?',
    options: [
      { label: 'A', value: 'Teleportation' },
      { label: 'B', value: 'Time travel' },
      { label: 'C', value: 'Mind reading' },
      { label: 'D', value: 'Perfect health' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Would you add 100 frail years to your life?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only with mental clarity' },
      { label: 'D', value: 'Depends on company' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'You can live forever but must watch everyone you love die. Accept?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only if others could too' },
      { label: 'D', value: 'Need more info' }
    ]
  },

  // CATEGORY 8 – LEADERSHIP AND MANAGEMENT
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Your team missed a critical deadline. What do you do?',
    options: [
      { label: 'A', value: 'Take full responsibility publicly' },
      { label: 'B', value: 'Identify who caused the delay' },
      { label: 'C', value: 'Focus on solutions without blame' },
      { label: 'D', value: 'Escalate to senior leadership' }
    ],
    insight: 'Leadership under pressure reveals whether we protect our team or protect ourselves.'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'A team member is underperforming but trying hard. What do you do?',
    options: [
      { label: 'A', value: 'Give direct feedback immediately' },
      { label: 'B', value: 'Wait and observe longer' },
      { label: 'C', value: 'Reassign their tasks quietly' },
      { label: 'D', value: 'Have them self-assess first' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You discover a team member is paid significantly less for equal work. What do you do?',
    options: [
      { label: 'A', value: 'Tell them immediately' },
      { label: 'B', value: 'Go to HR first' },
      { label: 'C', value: 'Stay out of it' },
      { label: 'D', value: 'Advocate for them anonymously' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: 'Your manager takes credit for your work. What do you do?',
    options: [
      { label: 'A', value: 'Confront them privately' },
      { label: 'B', value: 'Document and escalate' },
      { label: 'C', value: 'Let it go this time' },
      { label: 'D', value: 'Make contribution visible next time' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.FRIENDSHIP,
    text: 'Two team members have a personality clash. You:',
    options: [
      { label: 'A', value: 'Mediate between them' },
      { label: 'B', value: 'Give them space to resolve it' },
      { label: 'C', value: 'Separate them on projects' },
      { label: 'D', value: 'Address it in a team meeting' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'Your project is failing but you can hide it for 2 more weeks. Do you:',
    options: [
      { label: 'A', value: 'Report it now' },
      { label: 'B', value: 'Try to fix it first' },
      { label: 'C', value: 'Wait until asked' },
      { label: 'D', value: 'Blame external factors' }
    ],
    insight: 'How we handle failure reveals our relationship with honesty and self-preservation.'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Your project is on track but a colleague\'s is failing. They need your resources. Do you:',
    options: [
      { label: 'A', value: 'Help them fully' },
      { label: 'B', value: 'Help but protect your timeline' },
      { label: 'C', value: 'Decline politely' },
      { label: 'D', value: 'Escalate to management' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'In a crisis with limited info, do you:',
    options: [
      { label: 'A', value: 'Decide fast and commit' },
      { label: 'B', value: 'Gather more data first' },
      { label: 'C', value: 'Consult the team' },
      { label: 'D', value: 'Wait for leadership' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Three urgent tasks: client emergency, team crisis, or strategic opportunity. You prioritise:',
    options: [
      { label: 'A', value: 'Client emergency' },
      { label: 'B', value: 'Team crisis' },
      { label: 'C', value: 'Strategic opportunity' },
      { label: 'D', value: 'Delegate all three' }
    ]
  },

  // CATEGORY 9 – POLITICAL DILEMMAS
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'A policy would help 60% of people but significantly harm 40%. Support it?',
    options: [
      { label: 'A', value: 'Yes, majority wins' },
      { label: 'B', value: 'No, protect the minority' },
      { label: 'C', value: 'Depends on the harm' },
      { label: 'D', value: 'Needs compromise' }
    ],
    insight: 'Utilitarian vs rights-based thinking - do we maximize good or protect individuals?'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Tax the wealthy heavily to fund social programs?',
    options: [
      { label: 'A', value: 'Yes, redistribute wealth' },
      { label: 'B', value: 'No, they earned it' },
      { label: 'C', value: 'Moderately yes' },
      { label: 'D', value: 'Depends on economic impact' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Free speech vs preventing harm. Where\'s the line?',
    options: [
      { label: 'A', value: 'Protect all speech' },
      { label: 'B', value: 'Ban harmful speech' },
      { label: 'C', value: 'Case by case' },
      { label: 'D', value: 'Let platforms decide' }
    ]
  },
  {
    type: QuestionType.TRADE_OFF,
    category: QuestionCategory.VALUES,
    text: 'Climate action approach?',
    options: [
      { label: 'A', value: 'Immediate radical change' },
      { label: 'B', value: 'Gradual transition' },
      { label: 'C', value: 'Let market decide' },
      { label: 'D', value: 'Adapt, don\'t prevent' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Democracy works better if voting is:',
    options: [
      { label: 'A', value: 'Mandatory for everyone' },
      { label: 'B', value: 'Optional but encouraged' },
      { label: 'C', value: 'Truly optional' },
      { label: 'D', value: 'Limited to the informed' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'A protest blocks a hospital entrance to raise awareness. Justified?',
    options: [
      { label: 'A', value: 'Yes, for the cause' },
      { label: 'B', value: 'No, endangers people' },
      { label: 'C', value: 'Depends on the cause' },
      { label: 'D', value: 'Protest elsewhere' }
    ]
  },

  // CATEGORY 10 – CHARACTER UNDER PRESSURE
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You witness your boss commit fraud. What do you do?',
    options: [
      { label: 'A', value: 'Report it immediately' },
      { label: 'B', value: 'Confront them first' },
      { label: 'C', value: 'Document it quietly' },
      { label: 'D', value: 'Resign without reporting' }
    ],
    insight: 'Integrity vs self-preservation - one of the hardest choices we face.'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'Dream job offer requires lying about your background. Accept?',
    options: [
      { label: 'A', value: 'Yes, need the opportunity' },
      { label: 'B', value: 'No, never compromise' },
      { label: 'C', value: 'Negotiate honesty' },
      { label: 'D', value: 'Accept, come clean later' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'A colleague confides they\'re job hunting. Your boss asks if anyone\'s leaving. Do you:',
    options: [
      { label: 'A', value: 'Tell the truth' },
      { label: 'B', value: 'Say you don\'t know' },
      { label: 'C', value: 'Warn colleague first' },
      { label: 'D', value: 'Lie to protect them' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'Your company\'s product is unsafe but leadership won\'t act. Do you:',
    options: [
      { label: 'A', value: 'Whistleblow publicly' },
      { label: 'B', value: 'Resign quietly' },
      { label: 'C', value: 'Keep pushing internally' },
      { label: 'D', value: 'Nothing, need the job' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You accidentally see confidential salary data. Everyone\'s underpaid except you. Do you:',
    options: [
      { label: 'A', value: 'Tell everyone' },
      { label: 'B', value: 'Tell leadership' },
      { label: 'C', value: 'Stay quiet' },
      { label: 'D', value: 'Quit in solidarity' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.FRIENDSHIP,
    text: 'Your friend is interviewing at your company. They\'re not a good fit but need the job. Do you:',
    options: [
      { label: 'A', value: 'Give good reference anyway' },
      { label: 'B', value: 'Be honest about fit' },
      { label: 'C', value: 'Recuse yourself' },
      { label: 'D', value: 'Help them prepare honestly' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You can frame someone else for your mistake. They won\'t be severely punished. Do you?',
    options: [
      { label: 'A', value: 'Yes, survival first' },
      { label: 'B', value: 'No, never' },
      { label: 'C', value: 'Depends on stakes' },
      { label: 'D', value: 'Confess but minimize' }
    ]
  },

  // CATEGORY 11 – DEEPER PHILOSOPHY
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Is it better to exist and suffer, or never exist at all?',
    options: [
      { label: 'A', value: 'Exist and suffer' },
      { label: 'B', value: 'Never exist' },
      { label: 'C', value: 'Depends on severity' },
      { label: 'D', value: 'Can\'t compare' }
    ],
    insight: 'The antinatalism question - philosophers have debated this for centuries.'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Everyone you know forgets you but lives happily, or they die but remember you forever. Choose:',
    options: [
      { label: 'A', value: 'Forgotten but they live' },
      { label: 'B', value: 'Dead but remembered' },
      { label: 'C', value: 'Can\'t choose' },
      { label: 'D', value: 'Depends who' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Press a button to redistribute all wealth equally. You\'d lose most of yours. Do it?',
    options: [
      { label: 'A', value: 'Yes, for equality' },
      { label: 'B', value: 'No, I earned it' },
      { label: 'C', value: 'Depends how much I\'d lose' },
      { label: 'D', value: 'Need more details' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Is it morally wrong to have children given climate/political instability?',
    options: [
      { label: 'A', value: 'Yes, it\'s irresponsible' },
      { label: 'B', value: 'No, life finds a way' },
      { label: 'C', value: 'Depends on circumstances' },
      { label: 'D', value: 'Personal choice only' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Your consciousness uploaded to a computer, original body dies. Are you still you?',
    options: [
      { label: 'A', value: 'Yes, consciousness is me' },
      { label: 'B', value: 'No, I died' },
      { label: 'C', value: 'Both versions exist' },
      { label: 'D', value: 'Unknowable' }
    ],
    insight: 'The Ship of Theseus problem - what makes you, you?'
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'You can eliminate one human emotion forever. Which?',
    options: [
      { label: 'A', value: 'Fear' },
      { label: 'B', value: 'Anger' },
      { label: 'C', value: 'Jealousy' },
      { label: 'D', value: 'None, need all of them' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'A genie offers: cure all disease but remove all art, or keep both. Choose:',
    options: [
      { label: 'A', value: 'Cure disease, lose art' },
      { label: 'B', value: 'Keep both' },
      { label: 'C', value: 'Need to think' },
      { label: 'D', value: 'Depends what "art" means' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Experience 1000 years of joy then cease to exist, or 80 years of mixed emotions then maybe heaven?',
    options: [
      { label: 'A', value: '1000 years guaranteed joy' },
      { label: 'B', value: '80 years and maybe more' },
      { label: 'C', value: 'Depends on heaven odds' },
      { label: 'D', value: 'Can\'t decide' }
    ]
  }
];

export function seedQuestions() {
  // Clear old questions first to refresh the question bank
  try {
    dbHelpers.prepare('DELETE FROM questions').run();
    console.log('Cleared old questions');
  } catch (error) {
    console.log('No old questions to clear');
  }

  const insertStmt = dbHelpers.prepare(`
    INSERT INTO questions (id, type, category, text, options, insight)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  let count = 0;
  for (const q of questions) {
    const id = randomUUID();
    const optionsJson = JSON.stringify(
      q.options.map((opt, idx) => ({
        id: `${id}-${idx}`,
        label: opt.label,
        value: opt.value
      }))
    );

    insertStmt.run(id, q.type, q.category, q.text, optionsJson, q.insight || null);
    count++;
  }

  console.log(`Seeded ${count} questions`);
}
