import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AudioComponent } from './components/AudioComponent/AudioComponent';
import { AnswersList } from './components/AnswersList/AnswersList';
import { ContinueButton } from './components/ContinueButton/ContinueButton';
import { GAME_STATUS, MAX_ROUNDS_NUM } from './AudioChallenge.models';
import { loadRandomWords } from './store/AudioChallenge.thunks';
import { useStyles } from './AudioChallenge.styles';

export const AudioChallenge = () => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.LOADING);
  const [roundsWords, setRoundsWords] = useState();
  const [roundNum, setRoundNum] = useState(0);
  const [correctAnswerInThisRound, setCorrectAnswerInThisRound] = useState();
  const [isAudioPlay, setIsAudioPlay] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadRandomWords({ setRoundsWords }));
  }, [dispatch]);

  useEffect(() => {
    if (!roundsWords) return;
    const randomNum = Math.floor(Math.random() * 5);
    setCorrectAnswerInThisRound(roundsWords[roundNum][randomNum]);
    setGameStatus(GAME_STATUS.CHOICE);
  }, [roundsWords, roundNum, setCorrectAnswerInThisRound]);

  const checkAnswer = useCallback(
    selectedAnswerId => {
      if (selectedAnswerId === correctAnswerInThisRound.id) {
        setGameStatus(GAME_STATUS.IS_CORRECT);
      } else {
        setGameStatus(GAME_STATUS.IS_INCORRECT);
      }
    },
    [correctAnswerInThisRound],
  );

  const clickContinueButton = useCallback(() => {
    if (gameStatus === GAME_STATUS.CHOICE) {
      setGameStatus(GAME_STATUS.IS_INCORRECT);
      return;
    }
    roundNum === MAX_ROUNDS_NUM ? setGameStatus(GAME_STATUS.END) : setRoundNum(roundNum + 1);
  }, [gameStatus, roundNum]);

  return gameStatus === GAME_STATUS.LOADING || gameStatus === GAME_STATUS.END ? (
    'Game loading or End'
  ) : (
    <div className={classes.audioChallenge}>
      <AudioComponent
        gameStatus={gameStatus}
        isAudioPlay={isAudioPlay}
        setIsAudioPlay={setIsAudioPlay}
        correctAnswerInThisRound={correctAnswerInThisRound}
      />
      <AnswersList
        gameStatus={gameStatus}
        isAudioPlay={isAudioPlay}
        answers={roundsWords[roundNum]}
        correctAnswerInThisRound={correctAnswerInThisRound}
        checkAnswer={checkAnswer}
      />
      <ContinueButton gameStatus={gameStatus} isAudioPlay={isAudioPlay} clickContinueButton={clickContinueButton} />
    </div>
  );
};
