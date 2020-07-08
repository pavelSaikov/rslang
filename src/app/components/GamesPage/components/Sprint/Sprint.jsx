import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Game } from './components/Game/Game';
import { StatisticsAfterGame } from './components/Game/StatisticsAfterGame';
import { GameDescription } from '../common/GameDescription/GameDescription';
import { useStyles } from './Sprint.style';
import { userDictionarySelector } from '../../../DictionaryPage/store/UserDictionary.selectors.js';
import { loadDictionary } from '../../../LearningPage/store/LearningPage.thunks';
import { ROUTES } from '../../../../routing/routes';
import { WORD_STATUS } from '../../../DictionaryPage/DictionaryPage.models';
import { WORDS_NUMBER } from './components/Game/Game.models';
import { addError } from '../../../errors/store/Errors.actions';

export const Sprint = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [score, setScore] = useState(0);
  const [isUserWords, setIsUserWords] = useState(false);

  const dispatch = useDispatch();
  const userDictionary = useSelector(userDictionarySelector);

  useEffect(() => {
    if (userDictionary) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadDictionary({ setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [dispatch, userDictionary]);

  const updateStatistics = useCallback(answer => setStatistics(statistics => [...statistics, answer]), []);

  const onStartGameWithUserWords = useCallback(() => {
    const filteredDictionary = userDictionary.filter(word => word.status === WORD_STATUS.LEARNED);
    if (filteredDictionary < WORDS_NUMBER) {
      dispatch(addError('У вас недостаточно слов в словаре!'));
      return;
    }
    setIsUserWords(true);
    setIsGameStarted(true);
  }, [dispatch, userDictionary]);

  const onStartGameWithRandomWords = useCallback(() => {
    setIsUserWords(false);
    setIsGameStarted(true);
  }, []);

  const restartGame = useCallback(() => {
    setIsGameStarted(false);
    setIsGameEnded(false);
    setStatistics([]);
  }, []);

  const onEndGame = useCallback(currentScore => {
    setIsGameEnded(true);
    setScore(currentScore);
  }, []);

  const { statisticsAfterGameWrapper, gameWrapper } = useStyles();

  if (isRedirectToLoginPage) {
    return <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: ROUTES.GAMES } }} />;
  }

  return (
    userDictionary && (
      <div className={gameWrapper}>
        {!isGameStarted && !isGameEnded && (
          <GameDescription
            onStartGameWithUserWords={onStartGameWithUserWords}
            onStartGameWithRandomWords={onStartGameWithRandomWords}
            gameName={'Sprint'}
            shortDescription={'Description'}
          />
        )}
        {isGameStarted && !isGameEnded && (
          <Game onEndGame={onEndGame} updateStatistics={updateStatistics} isUserWords={isUserWords} />
        )}
        {isGameEnded && (
          <div className={statisticsAfterGameWrapper}>
            <StatisticsAfterGame statistics={statistics} restartGame={restartGame} score={score} />
          </div>
        )}
      </div>
    )
  );
};
