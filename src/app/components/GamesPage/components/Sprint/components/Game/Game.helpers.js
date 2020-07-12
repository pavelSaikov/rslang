import { WORDS_NUMBER, RANDOM_COEFFICIENT, NUMBER_CORRECT_ANSWER_FOR_MULTIPLIER } from './Game.models';
import { LEVEL_PAGE_GROUP_MAP } from '../../../common/GameDescription/components/DifficultySelector/DifficultySelector.models';
import { wordsService } from '../../../../../../services/WordsService/WordsService';

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

const shuffleArray = array => {
  const shuffledArray = array.slice(0);
  return shuffledArray.sort(() => Math.random() - 0.5);
};
