import React, { useCallback, useState } from 'react';

import { AudioComponent } from './components/AudioComponent/AudioComponent';
import { AnswersList } from './components/AnswersList/AnswersList';
import { ContinueButton } from './components/ContinueButton/ContinueButton';
import {
  GAME_LINK_AUDIO,
  GAME_LINK_IMG,
  ANSWERS,
  CORRECT_ANSWER,
  GAME_STATUS,
  CORRECT_ANSWER_TRANSLATE,
} from './AudioChallenge.models';
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

  const clickContinueButton = useCallback(() => {
    if (gameStatus === GAME_STATUS.CHOICE) {
      setGameStatus(GAME_STATUS.IS_INCORRECT);
    }
  }, [gameStatus]);

  return (
    <div className={classes.audioChallenge}>
      <AudioComponent
        gameStatus={gameStatus}
        linkToAudio={GAME_LINK_AUDIO}
        linkToImg={GAME_LINK_IMG}
        correctAnswerTranslate={CORRECT_ANSWER_TRANSLATE}
      />
      <AnswersList gameStatus={gameStatus} answers={ANSWERS} correctAnswer={CORRECT_ANSWER} checkAnswer={checkAnswer} />
      <ContinueButton gameStatus={gameStatus} clickContinueButton={clickContinueButton} />
    </div>
  );
};
