/* eslint-disable indent */
import { useEffect } from 'react';

import {
  WORD_GAME_STATE,
  REPETITION_NUMBER_PER_GAME,
  GAME_MODE_MAX_LEARNED_WORDS_PER_GAME_MAP,
  WORD_STATUS_GAME_MODE_MAP,
  GAME_MODE_MAX_NEW_WORDS_PER_GAME_MAP,
  USER_MISTAKES_WEIGHT_COEFFICIENT,
  USER_OPINION_WEIGHT_COEFFICIENT,
} from '../LearningPage.models';
import { store } from '../../../store';
import { wordsService } from '../../../services/WordsService/WordsService';
import {
  USER_OPINIONS_ABOUT_WORD,
  USER_OPINION_ABOUT_WORD_DIFFICULTY_INDEX_MAP,
} from '../components/UserWordAssessment/UserWordAssessment.models';

export const useInitializeGame = ({
  setGameWords,
  setIndexCurrentWord,
  setIsGamePrepared,
  isStatisticsPrepared,
  isGamePrepared,
}) => {
  const {
    statistics: { commonStatistics },
    learningPageConfig: { repeatableWordStatus },
    userDictionary,
    settings,
  } = store.getState();

  useEffect(() => {
    if (isStatisticsPrepared && userDictionary && settings && !isGamePrepared) {
      const newWordsCount = GAME_MODE_MAX_NEW_WORDS_PER_GAME_MAP.get(repeatableWordStatus);

      const learnedWordsCount = GAME_MODE_MAX_LEARNED_WORDS_PER_GAME_MAP.get(repeatableWordStatus);
      const learnedWords = sortUserDictionaryByDifficulty({ dictionary: [...userDictionary], settings })
        .filter(word => WORD_STATUS_GAME_MODE_MAP.get(repeatableWordStatus).includes(word.status))
        .slice(0, learnedWordsCount);

      Promise.all(
        learnedWords.map(userInfoAboutWord =>
          wordsService
            .getWordInfo({ wordId: userInfoAboutWord.wordId })
            .then(wordInfo => ({ userInfo: userInfoAboutWord, ...wordInfo, gameState: WORD_GAME_STATE.LEARNED })),
        ),
      )
        .then(learnedWordsInfo =>
          Promise.all([
            Promise.resolve(learnedWordsInfo),
            ...Array.from({ length: newWordsCount }, (_, index) => index).reduce(
              acc => {
                const newWordPosition = wordsService.calculateNextWordPosition({ ...acc.lastLearnedWord });
                acc.lastLearnedWord = { ...newWordPosition };
                acc.newWords.push(
                  wordsService
                    .getWordByPosition({ ...newWordPosition })
                    .then(wordInfo => ({ ...wordInfo, gameState: WORD_GAME_STATE.NEW, wordPosition: newWordPosition })),
                );
                return acc;
              },
              { newWords: [], lastLearnedWord: commonStatistics.lastLearnedWord },
            ).newWords,
          ]),
        )
        .then(([learnedWordsInfo, ...newWordsInfo]) =>
          Array.from({ length: REPETITION_NUMBER_PER_GAME }, (_, index) => index).reduce((acc, _, index) => {
            if (!index) {
              acc.push(...learnedWordsInfo, ...newWordsInfo);
            } else {
              acc.push(
                ...learnedWordsInfo,
                ...newWordsInfo.map(word => ({ ...word, gameState: WORD_GAME_STATE.LEARNED })),
              );
            }

            return acc;
          }, []),
        )
        .then(gameWords => {
          setGameWords(gameWords);
          if (gameWords.length) {
            setIndexCurrentWord(0);
            setIsGamePrepared(true);
          }
        });
    }
  }, [
    commonStatistics,
    isGamePrepared,
    isStatisticsPrepared,
    repeatableWordStatus,
    setGameWords,
    setIndexCurrentWord,
    setIsGamePrepared,
    settings,
    userDictionary,
  ]);
};

const sortUserDictionaryByDifficulty = ({ dictionary, settings: { isUserOpinionCheckingVisible } }) =>
  dictionary.sort((leftWord, rightWord) => {
    const leftWordDifficultyCoefficient = leftWord.isWasMistakeInLastGame
      ? 1
      : calculateDifficultyCoefficient(leftWord, isUserOpinionCheckingVisible);

    const rightWordDifficultyCoefficient = rightWord.isWasMistakeInLastGame
      ? 1
      : calculateDifficultyCoefficient(rightWord, isUserOpinionCheckingVisible);

    return rightWordDifficultyCoefficient - leftWordDifficultyCoefficient;
  });

const calculateDifficultyCoefficient = (word, isUserOpinionCheckingVisible) =>
  word.userOpinionAboutWord !== USER_OPINIONS_ABOUT_WORD && isUserOpinionCheckingVisible
    ? calculateDifficultyCoefficientWithUserOpinion(word)
    : calculateDifficultyCoefficientWithoutUserOpinion(word);

const calculateDifficultyCoefficientWithUserOpinion = word =>
  USER_MISTAKES_WEIGHT_COEFFICIENT * (word.mistakesNumber / word.repetitionNumber) +
  USER_OPINION_WEIGHT_COEFFICIENT * USER_OPINION_ABOUT_WORD_DIFFICULTY_INDEX_MAP.get(word.userOpinionAboutWord);

const calculateDifficultyCoefficientWithoutUserOpinion = word => word.mistakesNumber / word.repetitionNumber;
