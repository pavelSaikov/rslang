import { useEffect } from 'react';

import { store } from '../../../store';
import { statisticsService } from '../../../services/StatisticsService/StatisticsService';
import { wordsService } from '../../../services/WordsService/WordsService';
import { WORD_GAME_STATE } from '../LearningPage.models';
import {
  setIsWasShownCardsStatistics,
  setIsWasShownNewWordsStatistics,
} from '../../StatisticsPage/store/daily-statistics/DailyStatistics.actions';
import { ERROR_MESSAGE_WORDS_SERVICE } from '../../../services/WordsService/WordsService.models';

export const useUpdateBackend = ({
  isLocalUserInfoUpdated,
  changesInUserDictionary,
  setIsLocalUserInfoUpdated,
  setIsShowDailyStatistics,
  continueGame,
  dispatch,
  isWasMistake,
  setIsRedirectToLoginPage,
}) => {
  const { statistics, settings, authorizationInfo } = store.getState();

  const controller = new AbortController();

  useEffect(() => {
    if (isLocalUserInfoUpdated) {
      Promise.all([
        statisticsService.updateStatistics({
          token: authorizationInfo.token,
          userId: authorizationInfo.userId,
          statistics,
          controller,
        }),
        (function () {
          if (changesInUserDictionary.gameState === WORD_GAME_STATE.NEW) {
            return wordsService.addUserWord({
              token: authorizationInfo.token,
              userId: authorizationInfo.userId,
              wordId: changesInUserDictionary.word.wordId,
              wordPayload: changesInUserDictionary.word,
              controller,
            });
          }

          return wordsService.updateUserWord({
            token: authorizationInfo.token,
            userId: authorizationInfo.userId,
            wordId: changesInUserDictionary.word.wordId,
            wordPayload: changesInUserDictionary.word,
            controller,
          });
        })(),
      ])
        .then(() => {
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
        })
        .catch(e => {
          if (e.message === ERROR_MESSAGE_WORDS_SERVICE.INVALID_ACCESS_TOKEN) {
            setIsRedirectToLoginPage(true);
          }
        });
    }
  }, [
    statistics,
    settings,
    authorizationInfo,
    isLocalUserInfoUpdated,
    changesInUserDictionary,
    isWasMistake,
    dispatch,
    continueGame,
    setIsLocalUserInfoUpdated,
    setIsShowDailyStatistics,
    controller,
    setIsRedirectToLoginPage,
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
