import { useEffect } from 'react';
import { statisticsService } from '../../../services/StatisticsService/StatisticsService';
import { resetDailyStatistics, checkIsAllStatisticsLoaded } from '../../LearningPage/store/LearningPage.thunks';
import { CHECKING_INTERVAL } from '../../LearningPage/LearningPage.models';

export const useCheckCommonStatistics = ({
  statistics,
  dispatch,
  setIsRedirectToLoginPage,
  setIsStatisticsPrepared,
}) => {
  useEffect(() => {
    if (checkIsAllStatisticsLoaded({ statistics })) {
      const intervalId = setInterval(() => {
        if (statisticsService.isStatisticsResetNeeded({ commonStatistics: statistics.commonStatistics })) {
          dispatch(
            resetDailyStatistics({
              statistics,
              setIsRedirectToLoginPage,
              setIsStatisticsPrepared,
              controller: new AbortController(),
            }),
          );
        }
      }, CHECKING_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [statistics, dispatch, setIsRedirectToLoginPage, setIsStatisticsPrepared]);
};
