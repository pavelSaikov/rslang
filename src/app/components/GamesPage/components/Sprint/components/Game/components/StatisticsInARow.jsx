import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './StatisticsInARow.style';
import { BASIC_POINTS, NUMBER_CORRECT_ANSWER_FOR_MULTIPLIER } from '../Game.models';

export const StatisticsInARow = ({ correctAnswerInARow, multiplier }) => {
  const [countMarks, setCountMarks] = useState(0);

  useEffect(() => setCountMarks(getCorrectAnswerMark(correctAnswerInARow)), [correctAnswerInARow]);

  const { statisticsWrapper, multiplyMessage, marksWrapper, correctAnswerCircle, answerCircle } = useStyles();

  return (
    <div className={statisticsWrapper}>
      <div className={marksWrapper}>{getBlockWithMarks(countMarks, correctAnswerCircle, answerCircle)}</div>
      <div className={multiplyMessage}>+{multiplier * BASIC_POINTS} очков за слово</div>
    </div>
  );
};

StatisticsInARow.propTypes = {
  correctAnswerInARow: PropTypes.number.isRequired,
  multiplier: PropTypes.number.isRequired,
};

const getCorrectAnswerMark = correctAnswerInARow =>
  Math.floor(correctAnswerInARow % NUMBER_CORRECT_ANSWER_FOR_MULTIPLIER);

const getBlockWithMarks = (countMarks, correctAnswerCircle, answerCircle) =>
  Array.from({ length: NUMBER_CORRECT_ANSWER_FOR_MULTIPLIER - 2 }, () => 0).map((_a, index) => {
    if (index < countMarks) {
      return (
        <div key={index} className={correctAnswerCircle}>
          <i className={'icon-learned'}></i>
        </div>
      );
    }
    return <div key={index} className={answerCircle}></div>;
  });
