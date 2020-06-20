import { GAMES_ROUTES } from '../../routes';

export const CARDS_NAMES = {
  AUDIO_CHALLENGE: 'Audio Challenge',
  ENGLISH_PUZZLE: 'English Puzzle',
  SAVANNA: 'Savanna',
  SPEAK_IT: 'SpeakIt',
  SPRINT: 'Sprint',
  MY_GAME: 'My game',
};

export const CARDS = [
  {
    iconClass: 'ic-audioChallenge',
    name: CARDS_NAMES.AUDIO_CHALLENGE,
    link: GAMES_ROUTES.AUDIO_CHALLENGE,
    backgroundColor: '#407DF4',
  },
  {
    iconClass: 'ic-englishPuzzle',
    name: CARDS_NAMES.ENGLISH_PUZZLE,
    link: GAMES_ROUTES.ENGLISH_PUZZLE,
    backgroundColor: '#FF5267',
  },
  {
    iconClass: 'ic-savanna',
    name: CARDS_NAMES.SAVANNA,
    link: GAMES_ROUTES.SAVANNA,
    backgroundColor: '#5E6978',
  },
  {
    iconClass: 'ic-speakIt',
    name: CARDS_NAMES.SPEAK_IT,
    link: GAMES_ROUTES.SPEAK_IT,
    backgroundColor: '#F1E134',
  },
  {
    iconClass: 'ic-sprint',
    name: CARDS_NAMES.SPRINT,
    link: GAMES_ROUTES.SPRINT,
    backgroundColor: '#A0BEFA',
  },
  {
    iconClass: 'ic-myGame',
    name: CARDS_NAMES.MY_GAME,
    link: GAMES_ROUTES.MY_GAME,
    backgroundColor: '#407DF4',
  },
];

export const CARDS_NAMES_COLORS_MAP = new Map([
  [CARDS_NAMES.AUDIO_CHALLENGE, '#407DF4'],
  [CARDS_NAMES.ENGLISH_PUZZLE, '#FF5267'],
  [CARDS_NAMES.SAVANNA, '#5E6978'],
  [CARDS_NAMES.SPEAK_IT, '#F1E134'],
  [CARDS_NAMES.SPRINT, '#A0BEFA'],
  [CARDS_NAMES.MY_GAME, '#407DF4'],
]);
