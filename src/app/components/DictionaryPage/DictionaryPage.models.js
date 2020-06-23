import { DEFAULT_USER_OPINION_ABOUT_WORD } from '../LearningPage/components/UserWordAssessment/UserWordAssessment.models';

export const WORD_STATUS = {
  LEARNED: 'Learned',
  DIFFICULT: 'Difficult',
  REMOVED: 'Removed',
  DEFAULT: 'Default',
};

export const WORD_STATUSES = [WORD_STATUS.LEARNED, WORD_STATUS.DIFFICULT, WORD_STATUS.REMOVED];

export const DEFAULT_LAST_REPETITION = 'Default';

export const createUserWord = ({
  wordId,
  status = WORD_STATUS.DEFAULT,
  repetitionNumber = 1,
  lastRepetition = DEFAULT_LAST_REPETITION,
  mistakesNumber = 1,
  userOpinionAboutWord = DEFAULT_USER_OPINION_ABOUT_WORD,
  isWasMistakeInLastGame = false,
}) => ({
  wordId,
  repetitionNumber,
  mistakesNumber,
  status,
  lastRepetition,
  isWasMistakeInLastGame,
  userOpinionAboutWord,
});
