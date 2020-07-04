import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './ListElement.styles';
import { GAME_STATUS } from '../../../AudioChallenge.models';

export const ListElement = ({ gameStatus, answer, answerIndex, userAnswerId, isAnswerCorrect }) => {
  const classes = useStyles(gameStatus);
  const content = useMemo(() => {
    return gameStatus === GAME_STATUS.IS_CORRECT && isAnswerCorrect ? (
      <i className={`icon-learned ${classes.iconLearned}`} />
    ) : (
      answerIndex + 1
    );
  }, [gameStatus, answerIndex, isAnswerCorrect, classes.iconLearned]);

  const LiClass = useMemo(() => {
    let wordClass = classes.answer;
    if (isAnswerCorrect) wordClass += ` ${classes.correctAnswer}`;
    else if (answer.id === userAnswerId) wordClass += ` ${classes.incorrectAnswer}`;
    return wordClass;
  }, [classes, isAnswerCorrect, answer.id, userAnswerId]);

  return (
    <li className={LiClass} key={answer.id} data-id={answer.id} data-name={answer} data-num={answerIndex}>
      {content} {answer.wordTranslate.toUpperCase()}
    </li>
  );
};

ListElement.propTypes = {
  answer: PropTypes.object.isRequired,
  gameStatus: PropTypes.string.isRequired,
  answerIndex: PropTypes.number.isRequired,
  userAnswerId: PropTypes.string.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
};
