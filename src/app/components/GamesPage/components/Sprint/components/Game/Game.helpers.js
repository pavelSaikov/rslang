import { WORDS_NUMBER, RANDOM_COEFFICIENT, NUMBER_CORRECT_ANSWER_FOR_MULTIPLIER } from './Game.models';
import { LEVEL_PAGE_GROUP_MAP } from '../../../common/GameDescription/components/DifficultySelector/DifficultySelector.models';
import { wordsService } from '../../../../../../services/WordsService/WordsService';
import { store } from '../../../../../../store';

export const getWordsForGame = ({ level, isUserWords, userDictionary }) => {
  if (isUserWords) {
    const shuffledUserDictionary = shuffleArray(userDictionary);
    return Promise.all(
      shuffledUserDictionary.slice(0, WORDS_NUMBER).reduce((words, { wordId }) => {
        words.push(wordsService.getWordInfo({ wordId }));
        return words;
      }, []),
    );
  }

  return wordsService.getRandomWordsFromGroup({
    groupNumber: LEVEL_PAGE_GROUP_MAP.get(level),
    wordsNumber: WORDS_NUMBER,
    wordPerExampleSentenceLTE: 20,
  });
};

const getTranslationIdForRound = (countWords, wordIdForRound) => {
  if (Math.random() >= RANDOM_COEFFICIENT) {
    let translationId = wordIdForRound;
    while (wordIdForRound === translationId) {
      translationId = Math.floor(Math.random() * countWords);
    }
    return [translationId, false];
  }
  return [wordIdForRound, true];
};

export const setDataForNextRound = (
  words,
  wordIdForRound,
  setDataForRound,
  setCorrectAnswerBooleanFlag,
  setWordAudio,
) => {
  if (!words) {
    return;
  }
  const [translationId, correctAnswerBooleanFlag] = getTranslationIdForRound(words.length, wordIdForRound);
  setDataForRound({ word: words[wordIdForRound].word, translation: words[translationId].wordTranslate });
  setCorrectAnswerBooleanFlag(correctAnswerBooleanFlag);
  setWordAudio(words[wordIdForRound].audio);
};

export const getMultiplier = countCorrectAnswerInARow =>
  Math.pow(2, Math.floor(countCorrectAnswerInARow / NUMBER_CORRECT_ANSWER_FOR_MULTIPLIER));

export const getClassName = (previousAnswer, gameMain, correctAnswer, incorrectAnswer) => {
  if (previousAnswer === 'correct') return `${gameMain} ${correctAnswer}`;
  if (previousAnswer === 'incorrect') return `${gameMain} ${incorrectAnswer}`;
  return gameMain;
};

export const updateUserWordInRound = (updatedWord, isCorrectAnswer) => {
  const newUpdatedWord = { ...updatedWord };
  newUpdatedWord.lastRepetition = Date.now();
  newUpdatedWord.repetitionNumber += 1;
  if (!isCorrectAnswer) {
    newUpdatedWord.isWasMistakeInLastGame = true;
    newUpdatedWord.mistakesNumber += 1;
  } else {
    newUpdatedWord.isWasMistakeInLastGame = false;
  }
  return newUpdatedWord;
};

export const updateSprintStatisticsInStore = answerCountArray => {
  const { statistics } = store.getState();
  const percentCorrectAnswer =
    (answerCountArray.countCorrect * 100) /
    (answerCountArray.countCorrect + answerCountArray.countIncorrect
      ? answerCountArray.countCorrect + answerCountArray.countIncorrect
      : 1);
  const newSprintStatistics = statistics ? { ...statistics.sprintStatistics } : {};
  const dateString = new Date().toLocaleDateString('en-GB');

  const percentCorrectAnswerInDay = newSprintStatistics[dateString]
    ? newSprintStatistics[dateString]['percentCorrectAnswerInDay']
    : 0;
  const gamesCountInDay = newSprintStatistics[dateString] ? newSprintStatistics[dateString]['gamesCountInDay'] : 0;

  if (!newSprintStatistics[dateString]) {
    newSprintStatistics[dateString] = {
      percentCorrectAnswerInDay: 0,
      gamesCountInDay: 0,
    };
  }
  newSprintStatistics[dateString]['percentCorrectAnswerInDay'] = Math.floor(
    (percentCorrectAnswerInDay * gamesCountInDay + percentCorrectAnswer) / (gamesCountInDay + 1),
  );
  newSprintStatistics[dateString]['gamesCountInDay'] += 1;

  return newSprintStatistics;
};

const shuffleArray = array => {
  const shuffledArray = array.slice(0);
  return shuffledArray.sort(() => Math.random() - 0.5);
};
