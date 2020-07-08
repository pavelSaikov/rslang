import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useStyles } from './StatisticsPage.styles';
import { Menu } from '../Menu/Menu';
import { dailyStatisticsSelector } from './store/daily-statistics/DailyStatistics.selectors';
import { loadStatistics, loadSettings, checkIsAllStatisticsLoaded } from '../LearningPage/store/LearningPage.thunks';
import { ProgressStrip } from '../LearningPage/components/ProgressStrip/ProgressStrip';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../routing/routes';
import { settingsSelector } from '../SettingsPage/store/Settings.selectors';
import {
  PROGRESS_TYPE,
  PROGRESS_TYPE_FILLED_PART_COLOR_MAP,
} from '../LearningPage/components/ProgressStrip/ProgressPart.models';
import { Chart } from './components/Chart';
import { useCheckCommonStatistics } from '../common/hooks/useCheckCommonStatistics';
import { useSetLastVisiting } from '../common/hooks/useSetLastVisiting';
import { statisticsSelector } from './store/Statistics.selectors';
import { Loading } from '../common/components/Loading/Loading';
import { longTermStatisticsSelector } from './store/long-term-statistics/LongTermStatistics.selectors';

export const StatisticsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const statistics = useSelector(statisticsSelector);
  const dailyStatistics = useSelector(dailyStatisticsSelector);
  const longTermStatistics = useSelector(longTermStatisticsSelector);
  const settings = useSelector(settingsSelector);
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);
  const [isStatisticsPrepared, setIsStatisticsPrepared] = useState(false);

  useEffect(() => {
    if (settings) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadSettings({ setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [dispatch, settings]);

  useEffect(() => {
    if (checkIsAllStatisticsLoaded({ statistics })) {
      setIsStatisticsPrepared(true);
      return;
    }

    const controller = new AbortController();
    dispatch(loadStatistics({ setIsRedirectToLoginPage, setIsStatisticsPrepared, controller }));

    return () => controller.abort();
  }, [dispatch, statistics]);

  useCheckCommonStatistics({ statistics, dispatch, setIsStatisticsPrepared, setIsRedirectToLoginPage });

  useSetLastVisiting({ setIsRedirectToLoginPage, dispatch });

  const learnedWordsProgress = useMemo(() => {
    if (!dailyStatistics || !settings) {
      return;
    }

    const learnedWordsNumber = dailyStatistics.learnedWordsId.length;
    const dailyLearnedWordsNorm = settings.maxNewWordsPerDay;
    const partsNumber = learnedWordsNumber > dailyLearnedWordsNorm ? learnedWordsNumber : dailyLearnedWordsNorm;

    return (
      <div className={classes.progressStripContainer}>
        <div
          className={classes.progressStripHeader}
          style={{ color: PROGRESS_TYPE_FILLED_PART_COLOR_MAP.get(PROGRESS_TYPE.NEW_WORDS_PROGRESS) }}
        >
          <h3>Learned Word Progress</h3>
        </div>
        <ProgressStrip
          currentProgress={learnedWordsNumber - 1}
          partsNumber={Number.parseInt(partsNumber)}
          progressType={PROGRESS_TYPE.NEW_WORDS_PROGRESS}
          supremum={Number.parseInt(dailyLearnedWordsNorm)}
        />
      </div>
    );
  }, [dailyStatistics, settings, classes]);

  const cardsProgress = useMemo(() => {
    if (!dailyStatistics || !settings) {
      return;
    }

    const repeatedCardsNumber = dailyStatistics.cardsCounter;
    const dailyCardNorm = settings.maxCardsNumberPerDay;
    const partsNumber = repeatedCardsNumber > dailyCardNorm ? repeatedCardsNumber : dailyCardNorm;

    return (
      <div className={classes.progressStripContainer}>
        <div
          className={classes.progressStripHeader}
          style={{ color: PROGRESS_TYPE_FILLED_PART_COLOR_MAP.get(PROGRESS_TYPE.CARDS_PROGRESS) }}
        >
          <h3>Cards Progress</h3>
        </div>
        <ProgressStrip
          currentProgress={repeatedCardsNumber - 1}
          partsNumber={Number.parseInt(partsNumber)}
          progressType={PROGRESS_TYPE.CARDS_PROGRESS}
          supremum={Number.parseInt(dailyCardNorm)}
        />
      </div>
    );
  }, [dailyStatistics, settings, classes]);

  const percentCorrectAnswers = useMemo(() => {
    if (!dailyStatistics) {
      return;
    }

    return Math.floor(
      ((dailyStatistics.cardsCounter - dailyStatistics.mistakesNumber) / (dailyStatistics.cardsCounter || 1)) * 100,
    );
  }, [dailyStatistics]);

  if (isRedirectToLoginPage) {
    return <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: ROUTES.STATISTIC } }} />;
  }

  if (isStatisticsPrepared && settings) {
    return (
      <div className={classes.pageWrapper}>
        <Menu />
        <div className={classes.componentsWrapper}>
          <div className={classes.dailyStatisticsContainer}>
            <div className={`${classes.headerDailyStatistics} ${classes.maxSeriesLengthContainer}`}>
              <h3>Daily Statistics</h3>
            </div>
            {learnedWordsProgress}
            {cardsProgress}
            <div className={`${classes.numericStatisticsContainer} ${classes.percentCorrectAnswersContainer}`}>
              <h3>Percent Correct Answers: {percentCorrectAnswers}%</h3>
            </div>
            <div className={`${classes.numericStatisticsContainer} ${classes.maxSeriesLengthContainer}`}>
              <h3>Max Series Length: {dailyStatistics.maxSeriesLength}</h3>
            </div>
          </div>
          {longTermStatistics.length !== 0 && (
            <div className={classes.chartContainer}>
              <div className={classes.chartHeader}>
                <h3>Statistics Of Learning New Words</h3>
              </div>
              <Chart />
            </div>
          )}
        </div>
      </div>
    );
  }

  return <Loading />;
};
