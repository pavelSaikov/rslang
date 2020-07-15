import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import success from './../../../../../assets/sounds/success.mp3';
import error from './../../../../../assets/sounds/error.mp3';
import { useStyles } from './Savanna.styles';
import { AnswerList } from './components/AnswerList/AnswerList';
import { HiddenWord } from './components/HiddenWord/HiddenWord';
import { GameLife } from './components/GameLife/GameLife';
import { GAME_STATUS, GAME_STATE } from './Savanna.models';
import { StatisticsAfterGame } from '../Sprint/components/Game/StatisticsAfterGame';
import { GameDescription } from '../common/GameDescription/GameDescription';
import { Timer } from '../Sprint/components/Timer';
import { levelSelector } from '../common/GameDescription/store/DifficultySelector.selector';
import { Sound } from './components/Sound/Sound';
import { getGameWords } from './Savanna.helpers';
import { userDictionarySelector } from '../../../DictionaryPage/store/UserDictionary.selectors';
import {
  loadDictionary,
  uploadUserWord,
  checkIsAllStatisticsLoaded,
  loadStatistics,
} from '../../../LearningPage/store/LearningPage.thunks';
import { ROUTES } from '../../../../routing/routes';
import { GAMES_ROUTES } from '../../routes';
import { WORD_STATUS } from '../../../DictionaryPage/DictionaryPage.models';
import { addError } from '../../../errors/store/Errors.actions';
import { statisticsSelector } from '../../../StatisticsPage/store/Statistics.selectors';
import { updateSavannaStatistics } from './store/Savanna.thunk';
import { ExitButton } from '../common/ExitButton/ExitButton';

export const Savanna = () => {
  const { savanna, gameHeader, gameMain, timer, statisticsPage, gameWrapper, wrapper } = useStyles();
  const dispatch = useDispatch();
  const level = useSelector(levelSelector);
  const userDictionary = useSelector(userDictionarySelector);
  const statistics = useSelector(statisticsSelector);
  const [gameWords, setGameWords] = useState(null);
  const [gameRound, setGameRound] = useState(0);
  const [answer, setAnswer] = useState(GAME_STATE.default);
  const [gameStatistics, setGameStatistics] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [clickedElement, setClickedElement] = useState(null);
  const [countWrongAnswers, setCountWrongAnswers] = useState(0);
  const [isPreparationTime, setIsPreparationTime] = useState(true);
  const [soundOnOff, setSoundOnOff] = useState(true);
  const [isPlayWithUserWords, setIsPlayWithUserWords] = useState(null);
  const [IsRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);
  const timeOut = useRef(null);
  const answerCount = useRef({ countCorrect: 0, countIncorrect: 0 });

  useEffect(() => {
    if (gameWords || !isGameStarted) {
      return;
    }

    getGameWords(level, isPlayWithUserWords, userDictionary).then(result => {
      setGameWords(result);
    });
  }, [level, isPlayWithUserWords, gameWords, userDictionary, isGameStarted]);

  useEffect(() => {
    if (userDictionary) {
      return;
    }
    const controller = new AbortController();
    dispatch(loadDictionary({ setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [userDictionary, dispatch]);

  useEffect(() => {
    if (checkIsAllStatisticsLoaded({ statistics })) {
      return;
    }
    const controller = new AbortController();
    dispatch(loadStatistics({ setIsRedirectToLoginPage, setIsStatisticsPrepared: () => {}, controller }));

    return () => controller.abort();
  }, [userDictionary, dispatch, statistics]);

  useEffect(() => () => clearTimeout(timeOut.current), []);

  useEffect(() => setClickedElement(null), [gameRound]);

  useEffect(() => {
    const foo = setTimeout(() => {
      setGameRound(gameRound => gameRound + 1);
      setCountWrongAnswers(countWrongAnswers => countWrongAnswers + 1);
    }, 10000);

    return () => clearTimeout(foo);
  }, [gameRound, isPreparationTime]);

  useEffect(() => {
    const onKeypress = e => {
      if (isGameStarted) {
        e.preventDefault();
        const btnKey = Number(e.key);
        if (!isNaN(btnKey) && 1 <= btnKey && btnKey <= 4) {
          onAnswerChosen(gameWords[gameRound].answers[btnKey - 1] === gameWords[gameRound].correctWord.translation);
          setClickedElement(gameWords[gameRound].answers[btnKey - 1]);
        }
      }
    };

    document.addEventListener('keydown', onKeypress);

    return () => document.removeEventListener('keydown', onKeypress);
  }, [gameRound, gameWords, isGameStarted, onAnswerChosen]);

  useEffect(() => {
    if (countWrongAnswers === 5) {
      setIsGameEnded(true);
    }
  }, [countWrongAnswers]);

  const endPreparationTime = useCallback(() => setIsPreparationTime(false), []);

  const restartGame = useCallback(() => {
    answerCount.current = { countCorrect: 0, countIncorrect: 0 };
    setGameRound(0);
    setGameWords(null);
    setCountWrongAnswers(0);
    setIsPreparationTime(true);
    setIsGameStarted(false);
    setIsGameEnded(false);
    setGameStatistics([]);
  }, []);

  const onStartGameWithUserWords = useCallback(() => {
    if (userDictionary.filter(el => el.status === WORD_STATUS.LEARNED).length <= 10) {
      dispatch(addError('Недостаточно слов в словаре'));
      return;
    }

    setIsPlayWithUserWords(true);
    setIsGameStarted(true);
  }, [userDictionary, dispatch]);

  const onStartGameWithRandomWords = useCallback(() => {
    setIsPlayWithUserWords(false);
    setIsGameStarted(true);
  }, []);

  const closeGame = useCallback(() => {
    dispatch(updateSavannaStatistics(answerCount.current, setIsRedirectToLoginPage));
    setIsGameEnded(true);
  }, [dispatch]);

  const onClick = useCallback(
    e => {
      setClickedElement(e.target.innerHTML.toLowerCase());
      const isCorrectAnswer = e.target.innerHTML.toLowerCase() === gameWords[gameRound].correctWord.translation;

      onAnswerChosen(isCorrectAnswer);
    },
    [gameRound, gameWords, onAnswerChosen],
  );

  const changeSongState = useCallback(
    e => {
      if (soundOnOff) {
        setSoundOnOff(false);
        e.target.classList.remove('icon-volume-medium');
        e.target.classList.add('icon-volume-mute');
      } else {
        setSoundOnOff(true);
        e.target.classList.remove('icon-volume-mute');
        e.target.classList.add('icon-volume-medium');
      }
    },
    [soundOnOff],
  );

  const onAnswerChosen = useCallback(
    isCorrectAnswer => {
      isCorrectAnswer ? (answerCount.current.countCorrect += 1) : (answerCount.current.countIncorrect += 1);

      if (soundOnOff) {
        const sound = new Audio(isCorrectAnswer ? success : error);
        sound.play();
      }

      if (!isCorrectAnswer) {
        setCountWrongAnswers(countWrongAnswers => countWrongAnswers + 1);
      }

      setAnswer(GAME_STATE[isCorrectAnswer]);
      setGameStatistics(statistics => [
        ...statistics,
        {
          ...gameWords[gameRound].correctWord,
          isCorrectAnswer,
        },
      ]);

      if (isPlayWithUserWords) {
        const currentWord = {
          ...userDictionary.find(({ wordId }) => wordId == gameWords[gameRound].correctWord.globalWordId),
        };
        if (!isCorrectAnswer) {
          currentWord.mistakesNumber += 1;
          currentWord.isWasMistakeInLastGame = true;
        }
        currentWord.repetitionNumber += 1;
        currentWord.lastRepetition = Date.now();
        dispatch(
          uploadUserWord({ setIsRedirectToLoginPage, controller: new AbortController(), updatedWord: currentWord }),
        );
      }

      if (gameWords.length - 1 === gameRound) {
        dispatch(updateSavannaStatistics(answerCount.current, setIsRedirectToLoginPage));
        setIsGameEnded(true);
        return;
      }

      timeOut.current = setTimeout(() => {
        setAnswer(GAME_STATE.default);
        setGameRound(gameRound => gameRound + 1);
      }, 1000);
    },
    [gameRound, gameWords, soundOnOff, isPlayWithUserWords, userDictionary, dispatch],
  );
  if (IsRedirectToLoginPage) {
    <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: `${ROUTES.GAMES}${GAMES_ROUTES.SAVANNA}` } }} />;
  }

  return (
    userDictionary && (
      <div className={gameWrapper}>
        {!isGameStarted && !isGameEnded && (
          <GameDescription
            onStartGameWithUserWords={onStartGameWithUserWords}
            onStartGameWithRandomWords={onStartGameWithRandomWords}
            gameName={'Savanna'}
            shortDescription={'Игра, которая поможет развить словарный запас'}
          />
        )}
        {gameWords && isGameStarted && !isGameEnded && (
          <div className={wrapper}>
            {isPreparationTime && (
              <div className={timer}>
                <Timer onTimerEnd={endPreparationTime} time={GAME_STATUS.COUNTDOWN} />
              </div>
            )}
            {!isPreparationTime && (
              <div className={savanna}>
                <div className={gameHeader}>
                  <Sound changeSongState={changeSongState} />
                  <GameLife answer={answer} countWrongAnswers={countWrongAnswers} closeGame={closeGame} />
                  <ExitButton onCrossClick={closeGame} />
                </div>
                <div className={gameMain}>
                  <HiddenWord gameState={gameWords[gameRound]} answer={answer} />
                  <AnswerList gameState={gameWords[gameRound]} onClick={onClick} clickedElement={clickedElement} />
                </div>
              </div>
            )}
          </div>
        )}
        {isGameEnded && (
          <div className={statisticsPage}>
            <StatisticsAfterGame statistics={gameStatistics} restartGame={restartGame} />
          </div>
        )}
      </div>
    )
  );
};
