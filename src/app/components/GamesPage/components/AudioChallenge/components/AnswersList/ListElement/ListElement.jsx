import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './ListElement.styles';
import { GAME_STATUS } from '../../../AudioChallenge.models';

export const ListElement = ({ gameStatus, answer, answerIndex, correctAnswer, userAnswer }) => {
  const classes = useStyles(gameStatus);
  const content = useMemo(() => {
    return gameStatus === GAME_STATUS.IS_CORRECT && answer === correctAnswer ? (
      <i className={`icon-learned ${classes.iconLearned}`} />
    ) : (
      answerIndex + 1
    );
  }, [gameStatus, answer, correctAnswer, answerIndex, classes.iconLearned]);

  const LiClass = useMemo(() => {
    let wordClass = classes.answer;
    if (answer === correctAnswer) wordClass += ` ${classes.correctAnswer}`;
    else if (answer === userAnswer) wordClass += ` ${classes.incorrectAnswer}`;
    return wordClass;
  }, [answer, userAnswer, classes.answer, correctAnswer, classes.correctAnswer, classes.incorrectAnswer]);

  return (
    <li className={LiClass} key={answer} data-name={answer} data-num={answerIndex}>
      {content} {answer.toUpperCase()}
    </li>
  );
};

ListElement.propTypes = {
  answer: PropTypes.string.isRequired,
  gameStatus: PropTypes.string.isRequired,
  answerIndex: PropTypes.number.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  userAnswer: PropTypes.string.isRequired,
};
