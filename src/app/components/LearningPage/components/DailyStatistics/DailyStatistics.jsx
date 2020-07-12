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
  isGameEnd,
  dailyStatistics: { learnedWordsId, mistakesNumber, maxSeriesLength, cardsCounter },
  settings: { maxCardsNumberPerDay, maxNewWordsPerDay },
}) => {
  const classes = useStyles();

  const header = useMemo(() => {
    if (isGameEnd) {
      return 'Игра окончена';
    }
    if (cardsCounter === maxCardsNumberPerDay && learnedWordsId.length === maxNewWordsPerDay) {
      return 'Вы повторили максимальное количество карточек и изучили максимальное количество новых слов на сегодня';
    }
    if (cardsCounter !== maxCardsNumberPerDay && learnedWordsId.length === maxNewWordsPerDay) {
      return 'Вы изучили максимальное количество новых слов на сегодня';
    }
    if (cardsCounter === maxCardsNumberPerDay && learnedWordsId.length !== maxNewWordsPerDay) {
      return 'Вы повторили максимальное количество карточек на сегодня';
    }
  }, [cardsCounter, maxCardsNumberPerDay, learnedWordsId, maxNewWordsPerDay, isGameEnd]);

  const percentCorrectAnswers = useMemo(
    () => Math.floor(((cardsCounter - mistakesNumber) / (cardsCounter || 1)) * 100),
    [mistakesNumber, cardsCounter],
  );

  return (
    <div className={classes.statisticsCard}>
      <div className={classes.headerContainer}>
        <h4>{header}</h4>
      </div>
      <div className={classes.statisticsContainer}>
        <div className={`${classes.statisticsItem} ${classes.cardsCompleted}`}>
          <div className={classes.statisticsSentence}>{CARDS_COMPLETED_SENTENCE}</div>
          <div>{cardsCounter}</div>
        </div>
        <div className={`${classes.statisticsItem} ${classes.correctAnswers}`}>
          <div className={classes.statisticsSentence}>{CORRECT_ANSWERS_SENTENCE}</div>
          <div>{`${percentCorrectAnswers}%`}</div>
        </div>
        <div className={`${classes.statisticsItem} ${classes.newWords}`}>
          <div className={classes.statisticsSentence}>{NEW_WORDS_SENTENCE}</div>
          <div>{learnedWordsId.length}</div>
        </div>
        <div className={`${classes.statisticsItem} ${classes.seriesLength}`}>
          <div className={classes.statisticsSentence}>{MAX_SERIES_SENTENCE}</div>
          <div>{maxSeriesLength}</div>
        </div>
      </div>
      {!isGameEnd && (
        <div className={classes.buttonContainer}>
          <Button onClick={onContinueGameClick} styleClasses={classes.button} message={CONTINUE_GAME_SENTENCE} />
        </div>
      )}
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
  isGameEnd: PropTypes.bool.isRequired,
};
