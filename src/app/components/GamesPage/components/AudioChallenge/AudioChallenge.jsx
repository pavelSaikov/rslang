import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AudioComponent } from './components/AudioComponent/AudioComponent';
import { AnswersList } from './components/AnswersList/AnswersList';
import { ContinueButton } from './components/ContinueButton/ContinueButton';
import { GAME_INFO, GAME_STATUS, MAX_ROUNDS_NUM, WORDS_NUMBER } from './AudioChallenge.models';
import { loadWords, loadWordsInfo, updateAudioChallengeStatistics } from './store/AudioChallenge.thunks';
import { GameDescription } from '../common/GameDescription/GameDescription';
import { Loading } from './../../../common/components/Loading/Loading';
import { useStyles } from './AudioChallenge.styles';
import { userDictionarySelector } from '../../../DictionaryPage/store/UserDictionary.selectors';
import { ROUTES } from '../../../../routing/routes';
import { WORD_STATUS } from '../../../DictionaryPage/DictionaryPage.models';
import { addError } from '../../../errors/store/Errors.actions';
import { StatisticsAfterGame } from '../Sprint/components/Game/StatisticsAfterGame';
import { ExitButton } from '../common/ExitButton/ExitButton';
import {
  uploadUserWord,
  checkIsAllStatisticsLoaded,
  loadStatistics,
  loadDictionary,
} from '../../../LearningPage/store/LearningPage.thunks';
import { statisticsSelector } from '../../../StatisticsPage/store/Statistics.selectors';

export const AudioChallenge = () => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.DESCRIPTION);
  const [roundsWords, setRoundsWords] = useState();
  const [roundNum, setRoundNum] = useState(0);
  const [correctAnswersArr, setCorrectAnswersArr] = useState();
  const [isAudioPlay, setIsAudioPlay] = useState(false);
  const [isUserWordsUse, setIsUserWordsUse] = useState(undefined);
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);
  const [gameStatistics, setGameStatistics] = useState([]);
  const userDictionary = useSelector(userDictionarySelector);
  const statistics = useSelector(statisticsSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const answerCount = useRef({ countCorrect: 0, countIncorrect: 0 });

  useEffect(() => {
    if (checkIsAllStatisticsLoaded({ statistics })) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadStatistics({ setIsRedirectToLoginPage, setIsStatisticsPrepared: () => {}, controller }));

    return () => controller.abort();
  }, [dispatch, statistics]);

  useEffect(() => {
    if (userDictionary) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadDictionary({ setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [dispatch, userDictionary]);

  useEffect(() => {
    if (isUserWordsUse === undefined || gameStatus !== GAME_STATUS.DESCRIPTION) return;
    if (!isUserWordsUse || (isUserWordsUse && correctAnswersArr)) {
      setGameStatus(GAME_STATUS.LOADING);
      dispatch(loadWords({ isUserWordsUse, setRoundsWords, correctAnswersArr, setCorrectAnswersArr, setGameStatus }));
      return;
    }
  }, [correctAnswersArr, dispatch, gameStatus, isUserWordsUse]);

  const updateStatistics = useCallback(answer => setGameStatistics(statistics => [...statistics, answer]), []);

  const checkAnswer = useCallback(
    selectedAnswer => {
      let isCorrectAnswer;
      if (selectedAnswer.id === correctAnswersArr[roundNum].id) {
        setGameStatus(GAME_STATUS.IS_CORRECT);
        isCorrectAnswer = true;
        answerCount.current.countCorrect += 1;
      } else {
        setGameStatus(GAME_STATUS.IS_INCORRECT);
        isCorrectAnswer = false;
        answerCount.current.countIncorrect += 1;
      }

      if (isUserWordsUse) {
        const targetWord = { ...userDictionary.find(word => word.wordId === correctAnswersArr[roundNum].id) };

        targetWord.lastRepetition = Date.now();
        targetWord.repetitionNumber += 1;

        if (!isCorrectAnswer) {
          targetWord.mistakesNumber += 1;
          targetWord.isWasMistakeInLastGame = true;
        }

        dispatch(
          uploadUserWord({ setIsRedirectToLoginPage, controller: new AbortController(), updatedWord: targetWord }),
        );
      }

      updateStatistics({
        word: selectedAnswer.word,
        globalWordId: selectedAnswer.id,
        translation: selectedAnswer.wordTranslate,
        wordAudio: selectedAnswer.audio,
        isCorrectAnswer: isCorrectAnswer,
      });
    },
    [correctAnswersArr, dispatch, isUserWordsUse, roundNum, updateStatistics, userDictionary],
  );

  const clickContinueButton = useCallback(() => {
    if (gameStatus === GAME_STATUS.CHOICE) {
      setGameStatus(GAME_STATUS.IS_INCORRECT);
      return;
    }

    if (roundNum === MAX_ROUNDS_NUM) {
      dispatch(updateAudioChallengeStatistics({ answerCount: answerCount.current, setIsRedirectToLoginPage }));
      setGameStatus(GAME_STATUS.END);
      return;
    }

    setRoundNum(roundNum + 1);
    setGameStatus(GAME_STATUS.CHOICE);
  }, [dispatch, gameStatus, roundNum]);

  const onStartGameWithRandomWords = useCallback(() => {
    if (isUserWordsUse !== undefined) return;
    setIsUserWordsUse(false);
  }, [isUserWordsUse]);

  const onStartGameWithUserWords = useCallback(() => {
    if (isUserWordsUse !== undefined) return;
    const filteredDictionary = userDictionary.filter(word => word.status === WORD_STATUS.LEARNED);
    if (filteredDictionary.length < WORDS_NUMBER) {
      dispatch(addError('У вас недостаточно слов в словаре!'));
      return;
    }
    setIsUserWordsUse(true);
    dispatch(loadWordsInfo({ filteredDictionary, setCorrectAnswersArr }));
  }, [dispatch, isUserWordsUse, userDictionary]);

  const restartGame = useCallback(() => {
    setRoundsWords();
    setRoundNum(0);
    setGameStatistics([]);
    setCorrectAnswersArr();
    setIsUserWordsUse();
    setIsRedirectToLoginPage();
    setGameStatus(GAME_STATUS.DESCRIPTION);
    answerCount.current = { countCorrect: 0, countIncorrect: 0 };
  }, []);

  const onExitClick = useCallback(
    () => dispatch(updateAudioChallengeStatistics({ answerCount: answerCount.current, setIsRedirectToLoginPage })),
    [dispatch],
  );

  if (gameStatus === GAME_STATUS.DESCRIPTION) {
    return (
      <div className={classes.gameDescriptionWrapper}>
        <GameDescription
          gameName={GAME_INFO.NAME}
          shortDescription={GAME_INFO.SHORT_DESCRIPTION}
          onStartGameWithRandomWords={onStartGameWithRandomWords}
          onStartGameWithUserWords={onStartGameWithUserWords}
        />
      </div>
    );
  }

  if (gameStatus === GAME_STATUS.LOADING) {
    return <Loading />;
  }

  if (isRedirectToLoginPage) {
    return <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: ROUTES.GAMES } }} />;
  }

  if (gameStatus === GAME_STATUS.END) {
    return (
      <div className={classes.statisticsAfterGameWrapper}>
        <StatisticsAfterGame statistics={gameStatistics} restartGame={restartGame} />
      </div>
    );
  }

  return (
    <div className={classes.audioChallenge}>
      <ExitButton onCrossClick={onExitClick} />
      <AudioComponent
        gameStatus={gameStatus}
        isAudioPlay={isAudioPlay}
        setIsAudioPlay={setIsAudioPlay}
        correctAnswerInThisRound={correctAnswersArr[roundNum]}
      />
      <AnswersList
        gameStatus={gameStatus}
        isAudioPlay={isAudioPlay}
        answers={roundsWords[roundNum]}
        correctAnswerInThisRound={correctAnswersArr[roundNum]}
        checkAnswer={checkAnswer}
      />
      <ContinueButton gameStatus={gameStatus} isAudioPlay={isAudioPlay} clickContinueButton={clickContinueButton} />
    </div>
  );
};
