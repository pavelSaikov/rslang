import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useStyles } from './Game.style';
import { Timer } from '../Timer';
import { Word } from './components/Word';
import { Score } from './components/Score';
import { WordAudio } from './components/WordAudio';
import { ControlButtons } from './components/ControlButtons';
import { StatisticsInARow } from './components/StatisticsInARow';
import { levelSelector } from '../../../common/GameDescription/store/DifficultySelector.selector';
import { userDictionarySelector } from '../../../../../DictionaryPage/store/UserDictionary.selectors';
import { uploadUserWord } from '../../../../../LearningPage/store/LearningPage.thunks';
import { ROUTES } from '../../../../../../routing/routes';
import { BASIC_POINTS, COUNTDOWN, GAME_TIME } from './Game.models';
import {
  getWordsForGame,
  setDataForNextRound,
  getMultiplier,
  getClassName,
  updateUserWordInRound,
} from './Game.helpers';

export const Game = ({ updateStatistics, onEndGame, isUserWords }) => {
  const [isPreparationTime, setIsPreparationTime] = useState(true);
  const [words, setWords] = useState(null);
  const [wordIdForRound, setWordIdForRound] = useState(0);
  const [wordAudio, setWordAudio] = useState('');
  const [correctAnswerBooleanFlag, setCorrectAnswerBooleanFlag] = useState(0);
  const [dataForRound, setDataForRound] = useState({});
  const [correctAnswerInARow, setCorrectAnswerInARow] = useState(0);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [previousAnswer, setPreviousAnswer] = useState();
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);

  const level = useSelector(levelSelector);
  const userDictionary = useSelector(userDictionarySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (words) {
      return;
    }
    getWordsForGame({ level, isUserWords, userDictionary }).then(wordsArray => setWords(wordsArray));
  }, [isUserWords, level, userDictionary, words]);

  useEffect(
    () => setDataForNextRound(words, wordIdForRound, setDataForRound, setCorrectAnswerBooleanFlag, setWordAudio),
    [words, wordIdForRound, score, correctAnswerInARow],
  );

  useEffect(() => {
    const timeout = setTimeout(() => setPreviousAnswer(''), 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [previousAnswer]);

  const endPreparationTime = useCallback(() => setIsPreparationTime(false), []);

  const closeGame = useCallback(() => onEndGame(score), [onEndGame, score]);

  const onControlButtonClick = useCallback(
    answer => {
      const currentGlobalWordId = words[wordIdForRound].id;
      const isCorrectAnswer = correctAnswerBooleanFlag === answer;

      if (isCorrectAnswer) {
        const newCorrectAnswerInARow = correctAnswerInARow + 1;
        const multiplier = getMultiplier(newCorrectAnswerInARow);

        setCorrectAnswerInARow(newCorrectAnswerInARow);
        setMultiplier(multiplier);
        setScore(multiplier * BASIC_POINTS + score);
        setPreviousAnswer('correct');
      } else {
        setCorrectAnswerInARow(0);
        setMultiplier(1);
        setPreviousAnswer('incorrect');
      }

      if (isUserWords) {
        const updatedWord = updateUserWordInRound(
          { ...userDictionary.filter(word => word.wordId === currentGlobalWordId)[0] },
          isCorrectAnswer,
        );
        dispatch(uploadUserWord({ setIsRedirectToLoginPage, controller: new AbortController(), updatedWord }));
      }

      updateStatistics({
        word: words[wordIdForRound].word,
        globalWordId: currentGlobalWordId,
        translation: words[wordIdForRound].wordTranslate,
        wordAudio: wordAudio,
        isCorrectAnswer: isCorrectAnswer,
      });

      if (wordIdForRound >= words.length - 1) {
        closeGame();
        return;
      }

      setWordIdForRound(wordIdForRound + 1);
    },
    [
      words,
      wordIdForRound,
      correctAnswerBooleanFlag,
      isUserWords,
      updateStatistics,
      wordAudio,
      correctAnswerInARow,
      score,
      userDictionary,
      dispatch,
      closeGame,
    ],
  );

  const {
    springWrapper,
    timeWrapper,
    gameWrapper,
    gameHeader,
    gameMain,
    correctAnswer,
    incorrectAnswer,
    close,
  } = useStyles();

  if (isRedirectToLoginPage) {
    return <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: ROUTES.GAMES } }} />;
  }

  return (
    <div className={springWrapper}>
      {isPreparationTime && (
        <div className={timeWrapper}>
          <Timer onTimerEnd={endPreparationTime} time={COUNTDOWN} />
        </div>
      )}
      {!isPreparationTime && (
        <div className={gameWrapper}>
          <div className={gameHeader}>
            <Timer onTimerEnd={closeGame} time={GAME_TIME} />
            <Score score={score} />
            <div className={close} onClick={closeGame}>
              ✕
            </div>
          </div>
          <div className={getClassName(previousAnswer, gameMain, correctAnswer, incorrectAnswer)}>
            <StatisticsInARow correctAnswerInARow={correctAnswerInARow} multiplier={multiplier} />
            <WordAudio wordAudio={wordAudio} />
            <Word data={dataForRound} multiplier={multiplier} />
            <ControlButtons onClickBut={onControlButtonClick} />
          </div>
        </div>
      )}
    </div>
  );
};

Game.propTypes = {
  updateStatistics: PropTypes.func.isRequired,
  onEndGame: PropTypes.func.isRequired,
  isUserWords: PropTypes.bool.isRequired,
};
