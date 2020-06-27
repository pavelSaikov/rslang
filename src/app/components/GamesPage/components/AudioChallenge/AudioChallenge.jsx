import React, { useCallback, useState } from 'react';

import { PlayWordAudioButton } from './components/PlayWordAudioButton/PlayWordAudioButton';
import { AnswersList } from './components/AnswersList/AnswersList';
import { GAME_LINK, ANSWERS, CORRECT_ANSWER, GAME_STATUS } from './AudioChallenge.models';
import { useStyles } from './AudioChallenge.styles';

export const AudioChallenge = () => {
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.CHOICE);
  const classes = useStyles();
  const checkAnswer = useCallback(
    selectedAnswer => {
      if (selectedAnswer === CORRECT_ANSWER) {
        setGameStatus(GAME_STATUS.IS_CORRECT);
      } else {
        setGameStatus(GAME_STATUS.IS_INCORRECT);
        setWrongAnswers([...wrongAnswers, selectedAnswer]);
      }
    },
    [wrongAnswers],
  );

  return (
    <div className={classes.audioChallenge}>
      <PlayWordAudioButton gameStatus={gameStatus} linkToAudio={GAME_LINK} />
      <AnswersList gameStatus={gameStatus} answers={ANSWERS} correctAnswer={CORRECT_ANSWER} checkAnswer={checkAnswer} />
    </div>
  );
};
