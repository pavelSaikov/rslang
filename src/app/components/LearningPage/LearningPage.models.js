import {
  setIsTranslationVisible,
  setIsExampleSentenceTranslationVisible,
  setIsWordDescriptionTranslationVisible,
} from '../SettingsPage/store/Settings.actions';
import { WORD_STATUS } from '../DictionaryPage/DictionaryPage.models';

export const MAX_NEW_WORDS_PER_GAME = 2;
export const MAX_LEARNED_WORDS_PER_GAME = 5;
export const REPETITION_NUMBER_PER_GAME = 1;
export const DEFAULT_WORDS_NUMBER_PER_GAME =
  (MAX_NEW_WORDS_PER_GAME + MAX_LEARNED_WORDS_PER_GAME) * REPETITION_NUMBER_PER_GAME;

export const WORD_GAME_STATE = {
  LEARNED: 'LEARNED',
  NEW: 'NEW',
};

export const GAME_MODE = {
  LEARNED: 'Learned',
  ONLY_NEW: 'Only New',
  LEARNED_AND_NEW: 'Learned And New',
  DIFFICULT: 'Difficult',
};

export const GAME_MODES = Object.keys(GAME_MODE).map(key => GAME_MODE[key]);

export const GAME_MODE_TRANSLATION_MAP = new Map([
  [GAME_MODE.LEARNED, 'Изученные'],
  [GAME_MODE.ONLY_NEW, 'Только новые'],
  [GAME_MODE.LEARNED_AND_NEW, 'Изученные и новые'],
  [GAME_MODE.DIFFICULT, 'Сложные'],
]);

export const WORD_STATUS_GAME_MODE_MAP = new Map([
  [GAME_MODE.LEARNED, [WORD_STATUS.LEARNED]],
  [GAME_MODE.LEARNED_AND_NEW, [WORD_STATUS.LEARNED, WORD_STATUS.DEFAULT]],
  [GAME_MODE.DIFFICULT, [WORD_STATUS.DIFFICULT]],
  [GAME_MODE.ONLY_NEW, []],
]);

export const WORD_STATUS_PICKER_GAME_MODE_MAP = new Map([
  [GAME_MODE.LEARNED, [WORD_STATUS.REMOVED, WORD_STATUS.DIFFICULT]],
  [GAME_MODE.LEARNED_AND_NEW, [WORD_STATUS.REMOVED, WORD_STATUS.DIFFICULT]],
  [GAME_MODE.DIFFICULT, [WORD_STATUS.REMOVED, WORD_STATUS.LEARNED]],
  [GAME_MODE.ONLY_NEW, []],
]);

export const GAME_MODE_MAX_NEW_WORDS_PER_GAME_MAP = new Map([
  [GAME_MODE.LEARNED, 0],
  [GAME_MODE.ONLY_NEW, MAX_NEW_WORDS_PER_GAME * 2],
  [GAME_MODE.LEARNED_AND_NEW, MAX_NEW_WORDS_PER_GAME],
  [GAME_MODE.DIFFICULT, 0],
]);

export const GAME_MODE_MAX_LEARNED_WORDS_PER_GAME_MAP = new Map([
  [GAME_MODE.LEARNED, MAX_LEARNED_WORDS_PER_GAME],
  [GAME_MODE.ONLY_NEW, 0],
  [GAME_MODE.LEARNED_AND_NEW, MAX_LEARNED_WORDS_PER_GAME],
  [GAME_MODE.DIFFICULT, MAX_LEARNED_WORDS_PER_GAME],
]);

export const USER_MISTAKES_WEIGHT_COEFFICIENT = 0.8;
export const USER_OPINION_WEIGHT_COEFFICIENT = 1 - USER_MISTAKES_WEIGHT_COEFFICIENT;

export const SETTINGS = [
  { option: 'Наличие перевода слова', action: setIsTranslationVisible, name: 'isTranslationVisible' },
  {
    option: 'Наличие перевода предложения с примером',
    action: setIsExampleSentenceTranslationVisible,
    name: 'isExampleSentenceTranslationVisible',
  },
  {
    option: 'Наличие перевода определения слова',
    action: setIsWordDescriptionTranslationVisible,
    name: 'isWordDescriptionTranslationVisible',
  },
];

export const CHECKING_INTERVAL = 1000;
