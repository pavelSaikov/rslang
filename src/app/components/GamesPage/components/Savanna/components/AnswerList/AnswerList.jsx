import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './AnswerList.styles';
import { ListElement } from './ListElement/ListElement';

export const AnswerList = ({ gameState, onClick, clickedElement }) => {
  const { answerList } = useStyles();
  return (
    <ol className={answerList}>
      {gameState.answers.map((answerWord, answerIndex) => {
        const isClicked = clickedElement === answerWord;
        const isCorrect = gameState.correctWord.translation === answerWord;
        return (
          <ListElement
            answerWord={answerWord}
            answerIndex={answerIndex}
            onClick={onClick}
            key={answerWord}
            isClicked={isClicked}
            isCorrect={isCorrect}
            userAnswer={clickedElement}
          />
        );
      })}
    </ol>
  );
};

AnswerList.propTypes = {
  clickedElement: PropTypes.string,
  gameState: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
