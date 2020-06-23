import React, { useCallback, useState } from 'react';
import { PlayWordAudioButton } from './components/PlayWordAudioButton/PlayWordAudioButton';
import { ListOfAnswers } from './components/ListOfAnswers/ListOfAnswers';
import { GAME_LINK, ANSWERS, CORRECT_ANSWER, GAME_STATUS } from './AudioChallenge.models';
import { useStyles } from './AudioChallenge.styles';

export const AudioChallenge = () => {
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.CHOICE);
  const classes = useStyles();
  const linkToAudio = GAME_LINK;
  const answers = ANSWERS;
  const correctAnswer = CORRECT_ANSWER;

  const checkAnswer = useCallback(
    selectedAnswer => {
      if (selectedAnswer === correctAnswer) {
        setGameStatus(GAME_STATUS.IS_CORRECT);
      } else {
        setGameStatus(GAME_STATUS.IS_INCORRECT);
        setWrongAnswers([...wrongAnswers, selectedAnswer]);
      }
    },
    [correctAnswer, wrongAnswers],
  );

  return (
    <div className={classes.audioChallenge}>
      <PlayWordAudioButton gameStatus={gameStatus} linkToAudio={linkToAudio} />
      <ListOfAnswers
        gameStatus={gameStatus}
        answers={answers}
        correctAnswer={correctAnswer}
        checkAnswer={checkAnswer}
      />
    </div>
  );
};
