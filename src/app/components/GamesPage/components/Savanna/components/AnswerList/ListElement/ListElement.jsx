import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './ListElement.styles';

export const ListElement = ({ answerWord, answerIndex, onClick, isCorrect, isClicked, userAnswer }) => {
  const { listElement } = useStyles({ isCorrect, isClicked, userAnswer });
  return (
    <li className={listElement} onClick={onClick} key={answerWord} data={answerIndex}>
      {answerWord.toUpperCase()}
    </li>
  );
};

ListElement.propTypes = {
  userAnswer: PropTypes.string,
  isClicked: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  answerWord: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  answerIndex: PropTypes.number.isRequired,
};
