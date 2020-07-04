import { useEffect } from 'react';

import { store } from '../../../store';
import { statisticsService } from '../../../services/StatisticsService/StatisticsService';
import { wordsService } from '../../../services/WordsService/WordsService';
import { WORD_GAME_STATE } from '../LearningPage.models';
import {
  setIsWasShownCardsStatistics,
  setIsWasShownNewWordsStatistics,
} from '../../StatisticsPage/store/daily-statistics/DailyStatistics.actions';

export const useUpdateBackend = ({
  isLocalUserInfoUpdated,
  changesInUserDictionary,
  setIsLocalUserInfoUpdated,
  setIsShowDailyStatistics,
  continueGame,
  dispatch,
  isWasMistake,
}) => {
  const {
    statistics,
    settings,
    authorizationInfo: { token, userId },
  } = store.getState();

  const controller = new AbortController();

  useEffect(() => {
    if (isLocalUserInfoUpdated) {
      Promise.all([
        statisticsService.updateStatistics({ token, userId, statistics, controller }),
        (function () {
          if (changesInUserDictionary.gameState === WORD_GAME_STATE.NEW) {
            return wordsService.addUserWord({
              token,
              userId,
              wordId: changesInUserDictionary.word.wordId,
              wordPayload: changesInUserDictionary.word,
              controller,
            });
          }

          return wordsService.updateUserWord({
            token,
            userId,
            wordId: changesInUserDictionary.word.wordId,
            wordPayload: changesInUserDictionary.word,
            controller,
          });
        })(),
      ]).then(() => {
        setIsLocalUserInfoUpdated(false);
        if (isWasMistake) {
          return;
        }

        if (
          checkIsDailyStatisticsShouldShown({
            dailyStatistics: statistics.dailyStatistics,
            settings,
            setIsShowDailyStatistics,
            dispatch,
          })
        ) {
          return;
        }

        continueGame();
      });
    }
  }, [
    statistics,
    settings,
    token,
    userId,
    isLocalUserInfoUpdated,
    changesInUserDictionary,
    isWasMistake,
    dispatch,
    continueGame,
    setIsLocalUserInfoUpdated,
    setIsShowDailyStatistics,
    controller,
  ]);
};

const checkIsDailyStatisticsShouldShown = ({
  settings: { maxNewWordsPerDay, maxCardsNumberPerDay },
  dailyStatistics: { learnedWordsId, cardsCounter, isWasShownCardsStatistics, isWasShownNewWordsStatistics },
  setIsShowDailyStatistics,
  dispatch,
}) => {
  if (cardsCounter === maxCardsNumberPerDay && !isWasShownCardsStatistics) {
    setIsShowDailyStatistics(true);
    dispatch(setIsWasShownCardsStatistics(true));
    return true;
  }

  if (learnedWordsId.length === maxNewWordsPerDay && !isWasShownNewWordsStatistics) {
    setIsShowDailyStatistics(true);
    dispatch(setIsWasShownNewWordsStatistics(true));
    return true;
  }

  return false;
};
