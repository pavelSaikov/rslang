import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  CARDS_COMPLETED_SENTENCE,
  CORRECT_ANSWERS_SENTENCE,
  NEW_WORDS_SENTENCE,
  MAX_SERIES_SENTENCE,
  CONTINUE_GAME_SENTENCE,
} from './DailyStatistics.models';
import { Button } from '../UserWordAssessment/Button/Button';
import { useStyles } from './DailyStatistics.styles';

export const DailyStatistics = ({
  onContinueGameClick,
  dailyStatistics: { learnedWordsId, mistakesNumber, maxSeriesLength, cardsCounter },
  settings: { maxCardsNumberPerDay, maxNewWordsPerDay },
}) => {
  const classes = useStyles();

  const header = useMemo(() => {
    if (cardsCounter === maxCardsNumberPerDay && learnedWordsId.length === maxNewWordsPerDay) {
      return 'You have repeated maximum cards number for today and have learned maximum new words for today';
    }
    if (cardsCounter !== maxCardsNumberPerDay && learnedWordsId.length === maxNewWordsPerDay) {
      return 'You have learned maximum new words for today';
    }
    if (cardsCounter === maxCardsNumberPerDay && learnedWordsId.length !== maxNewWordsPerDay) {
      return 'You have repeated maximum cards number for today';
    }
  }, [cardsCounter, maxCardsNumberPerDay, learnedWordsId, maxNewWordsPerDay]);

  const percentCorrectAnswers = useMemo(() => Math.floor((mistakesNumber / cardsCounter) * 100), [
    mistakesNumber,
    cardsCounter,
  ]);

  return (
    <div className={classes.statisticsCard}>
      <div className={classes.headerContainer}>
        <h4>{header}</h4>
      </div>
      <div className={classes.statisticsContainer}>
        <div className={classes.statisticsItem}>
          <div className={classes.statisticsSentence}>{CARDS_COMPLETED_SENTENCE}</div>
          <div>{cardsCounter}</div>
        </div>
        <div className={classes.statisticsItem}>
          <div className={classes.statisticsSentence}>{CORRECT_ANSWERS_SENTENCE}</div>
          <div>{`${percentCorrectAnswers}%`}</div>
        </div>
        <div className={classes.statisticsItem}>
          <div className={classes.statisticsSentence}>{NEW_WORDS_SENTENCE}</div>
          <div>{learnedWordsId.length}</div>
        </div>
        <div className={classes.statisticsItem}>
          <div className={classes.statisticsSentence}>{MAX_SERIES_SENTENCE}</div>
          <div>{maxSeriesLength}</div>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Button onClick={onContinueGameClick} message={CONTINUE_GAME_SENTENCE} />
      </div>
    </div>
  );
};

DailyStatistics.propTypes = {
  onContinueGameClick: PropTypes.func.isRequired,
  dailyStatistics: PropTypes.shape({
    learnedWordsId: PropTypes.array.isRequired,
    mistakesNumber: PropTypes.number.isRequired,
    maxSeriesLength: PropTypes.number.isRequired,
    cardsCounter: PropTypes.number.isRequired,
  }),
  settings: PropTypes.shape({
    maxCardsNumberPerDay: PropTypes.number.isRequired,
    maxNewWordsPerDay: PropTypes.number.isRequired,
  }),
};
