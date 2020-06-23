import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GAME_STATUS } from './../../AudioChallenge.models';
import { useStyles } from './ListOfAnswers.styles';

export const ListOfAnswers = ({ answers, checkAnswer, gameStatus, correctAnswer }) => {
  const [activeWordNum, setActiveWordNum] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const classes = useStyles(gameStatus);

  useEffect(() => {
    const onKeypress = e => {
      if (gameStatus === GAME_STATUS.CHOICE) {
        e.preventDefault();
        if (e.key === 'ArrowRight') {
          if (activeWordNum !== null && activeWordNum < answers.length - 1) {
            setActiveWordNum(activeWordNum + 1);
          } else setActiveWordNum(0);
        } else if (e.key === 'ArrowLeft') {
          if (activeWordNum !== null && activeWordNum > 0) {
            setActiveWordNum(activeWordNum - 1);
          } else setActiveWordNum(answers.length - 1);
        } else if (e.key === 'Enter' && activeWordNum !== null) {
          setUserAnswer(answers[activeWordNum]);
          checkAnswer(answers[activeWordNum]);
        }
      }
    };

    document.addEventListener('keydown', onKeypress);

    return () => document.removeEventListener('keydown', onKeypress);
  }, [activeWordNum, checkAnswer, answers, gameStatus]);

  const click = useCallback(
    e => {
      const wordName = e.target.dataset.name;
      const wordNum = Number(e.target.dataset.num);
      if (gameStatus === GAME_STATUS.CHOICE) {
        setActiveWordNum(wordNum);
        setUserAnswer(answers[wordNum]);
        checkAnswer(wordName);
      }
    },
    [gameStatus, checkAnswer, answers],
  );

  const liElement = answers.map((answer, answerIndex) => {
    let classOfWord = classes.answer;
    if (gameStatus === GAME_STATUS.CHOICE && answerIndex === activeWordNum) {
      classOfWord = `${classes.answer} ${classes.active}`;
    } else if (gameStatus === GAME_STATUS.IS_CORRECT && answer === correctAnswer) {
      classOfWord = `${classes.answer} ${classes.correctAnswer}`;
    } else if (gameStatus === GAME_STATUS.IS_INCORRECT) {
      if (answer === userAnswer) {
        classOfWord = `${classes.answer} ${classes.incorrectAnswer}`;
      } else if (answer === correctAnswer) {
        classOfWord = `${classes.answer} ${classes.correctAnswer}`;
      }
    }

    return (
      <li className={classOfWord} key={answer} data-name={answer} data-num={answerIndex}>
        {`${answerIndex + 1} ${answer.toUpperCase()}`}
      </li>
    );
  });

  return (
    <ul className={classes.listOfAnswers} onClick={e => click(e)}>
      {liElement}
    </ul>
  );
};

ListOfAnswers.propTypes = {
  answers: PropTypes.array.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  gameStatus: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
};
