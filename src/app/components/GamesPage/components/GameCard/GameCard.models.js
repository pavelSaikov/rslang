import { GAMES_ROUTES } from '../../routes';
import { AudioChallenge } from '../AudioChallenge/AudioChallenge';
import { Savanna } from '../Savanna/Savanna';
import { EnglishPuzzle } from '../EnglishPuzzle/EnglishPuzzle';
import { SpeakIt } from '../SpeakIt/SpeakIt';
import { Sprint } from '../Sprint/Sprint';
import { MyGame } from '../MyGame/MyGame';

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
    name: CARDS_NAMES.AUDIO_CHALLENGE,
    link: GAMES_ROUTES.AUDIO_CHALLENGE,
    backgroundColor: '#407DF4',
    component: AudioChallenge,
  },
  {
    name: CARDS_NAMES.ENGLISH_PUZZLE,
    link: GAMES_ROUTES.ENGLISH_PUZZLE,
    backgroundColor: '#FF5267',
    component: EnglishPuzzle,
  },
  {
    name: CARDS_NAMES.SAVANNA,
    link: GAMES_ROUTES.SAVANNA,
    backgroundColor: '#5E6978',
    component: Savanna,
  },
  {
    name: CARDS_NAMES.SPEAK_IT,
    link: GAMES_ROUTES.SPEAK_IT,
    backgroundColor: '#F1E134',
    component: SpeakIt,
  },
  {
    name: CARDS_NAMES.SPRINT,
    link: GAMES_ROUTES.SPRINT,
    backgroundColor: '#A0BEFA',
    component: Sprint,
  },
  {
    name: CARDS_NAMES.MY_GAME,
    link: GAMES_ROUTES.MY_GAME,
    backgroundColor: '#407DF4',
    component: MyGame,
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
