import { dbHelpers } from './schema.js';
import { QuestionType, QuestionCategory } from '@hyt/shared';
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
      { label: 'D', value: 'Caused a scene' },
      { label: 'E', value: 'Still not admitting it' }
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
      { label: 'D', value: 'Physical or bodily incident' },
      { label: 'E', value: 'I\'m taking this to the grave' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: "What's the strangest text you've ever received?",
    options: [
      { label: 'A', value: 'Wrong number chaos' },
      { label: 'B', value: 'Accidental confession' },
      { label: 'C', value: 'Passive-aggressive message' },
      { label: 'D', value: 'Explicit by mistake' },
      { label: 'E', value: 'Still don\'t know what it meant' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: "What's the cringiest thing you've ever posted online?",
    options: [
      { label: 'A', value: 'Emotional overshare' },
      { label: 'B', value: 'Try-hard caption' },
      { label: 'C', value: 'Drunk post' },
      { label: 'D', value: 'Opinion that aged badly' },
      { label: 'E', value: 'Deleted within minutes' }
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
      { label: 'D', value: 'Choosing myself' },
      { label: 'E', value: 'Still figuring it out' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.CONFESSIONS,
    text: 'Who do you wish you could reconnect with?',
    options: [
      { label: 'A', value: 'Old friend' },
      { label: 'B', value: 'Former partner' },
      { label: 'C', value: 'Family member' },
      { label: 'D', value: 'Mentor' },
      { label: 'E', value: 'Someone who\'s gone' }
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
      { label: 'D', value: 'Completely different person' },
      { label: 'E', value: 'Depends on power dynamics' }
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
      { label: 'D', value: 'When things fall apart' },
      { label: 'E', value: 'Rarely' }
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
      { label: 'D', value: 'Uncertainty' },
      { label: 'E', value: 'Letting people down' }
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
      { label: 'D', value: 'Out of habit' },
      { label: 'E', value: 'Can\'t remember' }
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
      { label: 'D', value: 'Shared history' },
      { label: 'E', value: 'Quiet presence' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.FRIENDSHIP,
    text: 'What\'s one thing you wish we did more as friends?',
    options: [
      { label: 'A', value: 'Trips' },
      { label: 'B', value: 'Honest conversations' },
      { label: 'C', value: 'Checking in' },
      { label: 'D', value: 'Celebrating wins' },
      { label: 'E', value: 'Nothing, it\'s good' }
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
      { label: 'D', value: 'Entertainer' },
      { label: 'E', value: 'Observer' }
    ]
  },
  {
    type: QuestionType.PREDICTION,
    category: QuestionCategory.FRIENDSHIP,
    text: 'Who in this group would you trust most with a secret?',
    options: [
      { label: 'A', value: 'Person A' },
      { label: 'B', value: 'Person B' },
      { label: 'C', value: 'Person C' },
      { label: 'D', value: 'Depends on the secret' },
      { label: 'E', value: 'None of you' }
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
      { label: 'D', value: 'Write it out' },
      { label: 'E', value: 'Avoid it' }
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
      { label: 'D', value: 'Depends on life stage' },
      { label: 'E', value: 'I\'m undecided' }
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
    type: QuestionType.TRADE_OFF,
    category: QuestionCategory.VALUES,
    text: 'Progress needs more…',
    options: [
      { label: 'A', value: 'Rule breakers' },
      { label: 'B', value: 'Rule followers' },
      { label: 'C', value: 'Both equally' },
      { label: 'D', value: 'Depends on the moment' }
    ],
    insight: 'This group leans towards stability over risk'
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
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'Is religion a net positive so far?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Mixed' },
      { label: 'D', value: 'Depends where' },
      { label: 'E', value: 'Unsure' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.VALUES,
    text: 'If everyone couldn\'t lie, the world would be…',
    options: [
      { label: 'A', value: 'Better' },
      { label: 'B', value: 'Worse' },
      { label: 'C', value: 'Chaotic' },
      { label: 'D', value: 'More honest but harsher' },
      { label: 'E', value: 'Short-lived' }
    ]
  },

  // CATEGORY 4 – MIND TRICKS AND DECISION STYLE
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'A bat and a ball cost £1.10 total. The bat costs £1 more than the ball. How much is the ball?',
    options: [
      { label: 'A', value: '10p' },
      { label: 'B', value: '5p' },
      { label: 'C', value: '1p' },
      { label: 'D', value: 'I\'m guessing' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'Which is more likely?',
    options: [
      { label: 'A', value: 'Linda is a bank teller' },
      { label: 'B', value: 'Linda is a bank teller and active in feminism' },
      { label: 'C', value: 'Both equally likely' }
    ]
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
      { label: 'C', value: 'They\'re equal' },
      { label: 'D', value: 'Depends on outcome' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'Would you take a 50 percent chance to win £150 or lose £100?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only if stakes were higher' },
      { label: 'D', value: 'Depends on mood' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MIND_TRICKS,
    text: 'Which sounds better?',
    options: [
      { label: 'A', value: '90 percent survive' },
      { label: 'B', value: '10 percent die' },
      { label: 'C', value: 'Same thing' }
    ]
  },

  // CATEGORY 5 – MORAL DILEMMAS AND IMPOSSIBLE CHOICES
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'A trolley will kill five people. You can divert it to kill one person who knowingly put themselves on the track. Do you act?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Depends who it is' },
      { label: 'D', value: 'Freeze' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'A trolley can only be stopped because one person\'s body will physically block it. Do you divert it?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only if anonymous' },
      { label: 'D', value: 'I couldn\'t act' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You can push one person to stop a trolley killing five. Do you push?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only in theory' },
      { label: 'D', value: 'Never' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You can steal a drug to save your partner\'s life. Stealing guarantees survival. Obeying the law guarantees death. What do you do?',
    options: [
      { label: 'A', value: 'Steal it' },
      { label: 'B', value: 'Don\'t steal it' },
      { label: 'C', value: 'Try another way' },
      { label: 'D', value: 'Freeze' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'A riot will end if you falsely imprison one innocent person. Otherwise many will be badly injured. Do you imprison them?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only temporarily' },
      { label: 'D', value: 'Depends on scale' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'Five patients need organs today. One healthy person could save them all. No one will ever know. Do you act?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Never directly' },
      { label: 'D', value: 'I don\'t know' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'A vaccine will save thousands but will certainly kill a small number. Do you approve it?',
    options: [
      { label: 'A', value: 'Approve' },
      { label: 'B', value: 'Reject' },
      { label: 'C', value: 'Delay' },
      { label: 'D', value: 'Require consent' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'You can end a war instantly by killing thousands now, or let it continue and kill tens of thousands later. Do you act?',
    options: [
      { label: 'A', value: 'Act now' },
      { label: 'B', value: 'Don\'t act' },
      { label: 'C', value: 'Depends on certainty' },
      { label: 'D', value: 'Refuse responsibility' }
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
    text: 'A self-driving car must choose. Prioritise…',
    options: [
      { label: 'A', value: 'Passenger' },
      { label: 'B', value: 'Least total harm' },
      { label: 'C', value: 'Children' },
      { label: 'D', value: 'Random chance' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.MORAL_DILEMMAS,
    text: 'An AI can maximise happiness by manipulating behaviour without consent. Deploy it?',
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
    text: 'You can live forever but can never die and must watch everyone you love die. Do you accept?',
    options: [
      { label: 'A', value: 'Yes' },
      { label: 'B', value: 'No' },
      { label: 'C', value: 'Only if others could too' },
      { label: 'D', value: 'Need more info' }
    ]
  },

  // CATEGORY 6 – LIFESTYLE, TASTE, AND IDENTITY
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.LIFESTYLE,
    text: 'What\'s your ultimate comfort food?',
    options: [
      { label: 'A', value: 'Pasta' },
      { label: 'B', value: 'Pizza' },
      { label: 'C', value: 'Curry' },
      { label: 'D', value: 'Burger' },
      { label: 'E', value: 'Something sweet' }
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
      { label: 'D', value: 'Mexican' },
      { label: 'E', value: 'Mediterranean' }
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
      { label: 'C', value: 'F1' },
      { label: 'D', value: 'Tennis' },
      { label: 'E', value: 'None' }
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
      { label: 'D', value: 'Classes' },
      { label: 'E', value: 'I avoid it' }
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
      { label: 'D', value: 'Adventurous' },
      { label: 'E', value: 'Unplanned' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.LIFESTYLE,
    text: 'Film you\'ve rewatched the most?',
    options: [
      { label: 'A', value: 'Comfort classic' },
      { label: 'B', value: 'Action blockbuster' },
      { label: 'C', value: 'Comedy' },
      { label: 'D', value: 'Drama' },
      { label: 'E', value: 'I don\'t rewatch' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.LIFESTYLE,
    text: 'Switch-your-brain-off show?',
    options: [
      { label: 'A', value: 'Reality TV' },
      { label: 'B', value: 'Sitcom' },
      { label: 'C', value: 'Crime' },
      { label: 'D', value: 'Sport' },
      { label: 'E', value: 'YouTube' }
    ]
  },

  // CATEGORY 7 – IMAGINATION, POWER, AND IDENTITY
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'If dictator for a year, you would…',
    options: [
      { label: 'A', value: 'Ban something annoying' },
      { label: 'B', value: 'Force something healthy' },
      { label: 'C', value: 'Redistribute wealth' },
      { label: 'D', value: 'Abolish work' },
      { label: 'E', value: 'Step down early' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Cartoon world for a week?',
    options: [
      { label: 'A', value: 'Simpsons' },
      { label: 'B', value: 'Pokémon' },
      { label: 'C', value: 'Studio Ghibli' },
      { label: 'D', value: 'Adventure Time' },
      { label: 'E', value: 'Rick and Morty' }
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
      { label: 'D', value: 'Dolphin' },
      { label: 'E', value: 'Lone wolf' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Full-body tattoo would be…',
    options: [
      { label: 'A', value: 'Art' },
      { label: 'B', value: 'Symbols' },
      { label: 'C', value: 'Text' },
      { label: 'D', value: 'Abstract chaos' },
      { label: 'E', value: 'I\'d refuse' }
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
      { label: 'D', value: 'Perfect health' },
      { label: 'E', value: 'Infinite energy' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Two-hour moment in history?',
    options: [
      { label: 'A', value: 'Ancient civilisation' },
      { label: 'B', value: 'Major war' },
      { label: 'C', value: 'Scientific breakthrough' },
      { label: 'D', value: 'Religious event' },
      { label: 'E', value: 'Personal curiosity' }
    ]
  },
  {
    type: QuestionType.SCENARIO,
    category: QuestionCategory.IMAGINATION,
    text: 'Add 100 frail years to your life?',
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
    text: 'New holiday would celebrate…',
    options: [
      { label: 'A', value: 'Rest' },
      { label: 'B', value: 'Friendship' },
      { label: 'C', value: 'Gratitude' },
      { label: 'D', value: 'Play' },
      { label: 'E', value: 'Chaos' }
    ]
  }
];

export function seedQuestions() {
  const insertStmt = dbHelpers.prepare(`
    INSERT OR IGNORE INTO questions (id, type, category, text, options, insight)
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
