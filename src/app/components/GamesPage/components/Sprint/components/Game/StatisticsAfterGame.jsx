import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { WordInfo } from './components/WordInfo';
import { useStyles } from './StatisticsAfterGame.style';
import { useStyles as styleButtons } from './components/ControlButtons.style';
import { ROUTES } from '../../../../../../routing/routes';

export const StatisticsAfterGame = ({ statistics, restartGame, score }) => {
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const history = useHistory();

  useEffect(() => sortStatistics(statistics, setCorrectWords, setIncorrectWords), [statistics]);

  const onRedirectToGamesPage = useCallback(() => history.push(ROUTES.GAMES), [history]);

  const {
    statisticsWrapper,
    scroll,
    answerWrapper,
    correctAnswerTitle,
    incorrectAnswerTitle,
    buttonsWrapper,
  } = useStyles();

  const { buttonTrue } = styleButtons();

  return (
    <div className={statisticsWrapper}>
      <div>{score}</div>
      <div className={scroll}>
        <div>
          <div className={correctAnswerTitle}>Правильные ответы ({correctWords.length}):</div>
          <div className={answerWrapper}>
            {correctWords.map(({ word, translation, wordAudio }) => (
              <WordInfo key={word} word={word} translation={translation} wordAudio={wordAudio} />
            ))}
          </div>
        </div>
        <hr></hr>
        <div>
          <div className={incorrectAnswerTitle}>Неправильные ответы ({incorrectWords.length}):</div>
          <div className={answerWrapper}>
            {incorrectWords.map(({ word, translation, wordAudio }) => (
              <WordInfo key={word} word={word} translation={translation} wordAudio={wordAudio} />
            ))}
          </div>
        </div>
      </div>
      <div className={buttonsWrapper}>
        <button className={buttonTrue} onClick={restartGame}>
          Начать заново
        </button>
        <button className={buttonTrue} onClick={onRedirectToGamesPage}>
          Выбрать другую игру
        </button>
      </div>
    </div>
  );
};

StatisticsAfterGame.propTypes = {
  statistics: PropTypes.array.isRequired,
  restartGame: PropTypes.func.isRequired,
  score: PropTypes.number,
};

const sortStatistics = (statistics, setCorrectWords, setIncorrectWords) => {
  statistics.forEach(({ word, translation, wordAudio, isCorrectAnswer }) => {
    const statisticsData = { word, translation, wordAudio };
    if (isCorrectAnswer) {
      setCorrectWords(correctWords => [...correctWords, statisticsData]);
    } else {
      setIncorrectWords(incorrectWords => [...incorrectWords, statisticsData]);
    }
  });
};
