import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { GAME_STATUS } from '../../AudioChallenge.models';
import { useStyles } from './AnswersList.styles';
import { ListElement } from './ListElement/ListElement';

import './../../../../../../../theme/fonts.css';

export const AnswersList = ({ answers, checkAnswer, gameStatus, isAudioPlay, correctAnswerInThisRound }) => {
  const [userAnswerId, setUserAnswerId] = useState('');
  const classes = useStyles();
  useEffect(() => {
    const onKeypress = e => {
      if (!isAudioPlay && gameStatus === GAME_STATUS.CHOICE) {
        e.preventDefault();
        const btnKey = Number(e.key);
        if (1 <= btnKey && btnKey <= 5) {
          setUserAnswerId(answers[btnKey - 1].id);
          checkAnswer(answers[btnKey - 1].id);
        }
      }
    };

    document.addEventListener('keydown', onKeypress);

    return () => document.removeEventListener('keydown', onKeypress);
  }, [checkAnswer, answers, gameStatus, isAudioPlay]);

  const click = useCallback(
    e => {
      if (!isAudioPlay && gameStatus === GAME_STATUS.CHOICE) {
        const clickOnAnswerId = answers[Number(e.target.dataset.num)].id;
        setUserAnswerId(clickOnAnswerId);
        checkAnswer(clickOnAnswerId);
      }
    },
    [isAudioPlay, gameStatus, answers, checkAnswer],
  );

  return (
    <ul className={classes.answersList} onClick={e => click(e)}>
      {answers.map((answer, answerIndex) => {
        return (
          <ListElement
            key={answer.id}
            gameStatus={gameStatus}
            answer={answer}
            answerIndex={answerIndex}
            isAnswerCorrect={answer.id === correctAnswerInThisRound.id}
            userAnswerId={userAnswerId}
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
  correctAnswerInThisRound: PropTypes.object.isRequired,
  isAudioPlay: PropTypes.bool.isRequired,
};
