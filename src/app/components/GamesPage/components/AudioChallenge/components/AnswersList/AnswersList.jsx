import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { GAME_STATUS } from '../../AudioChallenge.models';
import { useStyles } from './AnswersList.styles';
import { ListElement } from './ListElement/ListElement';

import './../../../../../../../theme/fonts.css';

export const AnswersList = ({ answers, checkAnswer, gameStatus, correctAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const onKeypress = e => {
      if (gameStatus === GAME_STATUS.CHOICE) {
        e.preventDefault();
        const btnKey = Number(e.key);
        if (1 <= btnKey && btnKey <= 5) {
          setUserAnswer(answers[btnKey - 1]);
          checkAnswer(answers[btnKey - 1]);
        }
      }
    };

    document.addEventListener('keydown', onKeypress);

    return () => document.removeEventListener('keydown', onKeypress);
  }, [checkAnswer, answers, gameStatus]);

  const click = useCallback(
    e => {
      const clickOnAnswer = answers[Number(e.target.dataset.num)];
      if (gameStatus === GAME_STATUS.CHOICE) {
        setUserAnswer(clickOnAnswer);
        checkAnswer(clickOnAnswer);
      }
    },
    [gameStatus, checkAnswer, answers],
  );

  return (
    <ul className={classes.listOfAnswers} onClick={e => click(e)}>
      {answers.map((answer, answerIndex) => {
        return (
          <ListElement
            key={answer}
            gameStatus={gameStatus}
            answer={answer}
            answerIndex={answerIndex}
            correctAnswer={correctAnswer}
            userAnswer={userAnswer}
          />
        );
      })}
    </ul>
  );
};

AnswersList.propTypes = {
  answers: PropTypes.array.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  gameStatus: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
};
