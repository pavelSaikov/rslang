import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { GameDescription } from '../common/GameDescription/GameDescription';
import { GAME_INFO } from './SpeakIt.models';
import { Illustration } from './components/Illustration/Illustration';
import { Translation } from './components/Translation/Translation';
import { useStyles } from './SpeakIt.styles';
import { WordItem } from './components/WordItem/WordItem';
import { Button } from '../../../AuthorizationPage/components/Button/Button';
import { setCurrentSetOfWords } from './store/SpeakIt.action';
import { setOfWordsSelector } from './store/SpeakIt.selector';
import { setActiveWord } from './store/SpeakIt.action';
import { addError } from '../../../errors/store/Errors.actions';
import { getArrayOfWords, updateSpeakItStatistics } from './store/SpeakIt.thunk';
import { StatisticsAfterGame } from '../Sprint/components/Game/StatisticsAfterGame';
import { userDictionarySelector } from '../../../DictionaryPage/store/UserDictionary.selectors';
import {
  loadDictionary,
  uploadUserWord,
  loadStatistics,
  checkIsAllStatisticsLoaded,
} from '../../../LearningPage/store/LearningPage.thunks';
import { ROUTES } from '../../../../routing/routes';
import { WORD_STATUS } from '../../../DictionaryPage/DictionaryPage.models';
import { ExitButton } from '../common/ExitButton/ExitButton';
import { Star } from './components/Star/Star';
import { statisticsSelector } from '../../../StatisticsPage/store/Statistics.selectors';
import { Background } from '../common/Background/Background';

export const SpeakIt = () => {
  const [isGameStarted, setGame] = useState(false);
  const [isItShowingStatistics, setStatisticPageState] = useState(false);
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);
  const [areUserWordsChosen, setAreUserWordsChosen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const arrOfWords = useSelector(setOfWordsSelector);
  const userDictionary = useSelector(userDictionarySelector);
  const statistics = useSelector(statisticsSelector);

  useEffect(() => {
    if (userDictionary) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadDictionary({ setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [dispatch, userDictionary]);

  useEffect(() => {
    if (checkIsAllStatisticsLoaded({ statistics })) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadStatistics({ setIsRedirectToLoginPage, setIsStatisticsPrepared: () => {}, controller }));

    return () => controller.abort();
  }, [dispatch, statistics]);

  useEffect(() => () => dispatch(updateSpeakItStatistics({ setIsRedirectToLoginPage })), [dispatch]);

  const onStartGameWithoutUserWords = useCallback(
    () => dispatch(getArrayOfWords({ setGame, areUserWordsChosen: false })),
    [dispatch],
  );

  const onStartGameWithUserWords = useCallback(() => {
    const filteredUserDictionary = userDictionary.filter(({ status }) => status === WORD_STATUS.LEARNED);
    if (filteredUserDictionary.length < 10) {
      dispatch(addError('У вас недостаточно слов в словаре!'));
      return;
    }

    setAreUserWordsChosen(true);

    dispatch(getArrayOfWords({ setGame, areUserWordsChosen: true, userDictionary: filteredUserDictionary }));
  }, [dispatch, userDictionary]);

  const startSpeechRecognition = useCallback(() => {
    let recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = e => {
      const haveBeenRecognized = Array.from(e.results)
        .map(e => e[0])
        .map(e => e.transcript)
        .join('');
      const updatedWordsArr = arrOfWords.map(wordInfo => {
        if (wordInfo.word === haveBeenRecognized) {
          const updatedWordInfo = { ...wordInfo, isItAnswered: true };
          dispatch(setActiveWord(updatedWordInfo));
          if (areUserWordsChosen) {
            const el = userDictionary.filter(a => a.id === wordInfo.id)[0];
            dispatch(
              uploadUserWord({
                setIsRedirectToLoginPage,
                controller: new AbortController(),
                updatedWord: { ...el, repetitionNumber: el.repetitionNumber + 1 },
              }),
            );
          }
          return updatedWordInfo;
        }

        return { ...wordInfo };
      });

      dispatch(setCurrentSetOfWords(updatedWordsArr));
    };

    recognition.onerror = event => {
      dispatch(addError(event.error));
    };
  }, [areUserWordsChosen, arrOfWords, dispatch, userDictionary]);

  const listOfWords = useMemo(() => arrOfWords.map(el => <WordItem key={el.id} el={el} />), [arrOfWords]);

  const toggleStatisticsPage = useCallback(() => setStatisticPageState(!isItShowingStatistics), [
    isItShowingStatistics,
  ]);

  const resetGame = useCallback(
    () => (areUserWordsChosen ? onStartGameWithUserWords() : onStartGameWithoutUserWords()),
    [areUserWordsChosen, onStartGameWithUserWords, onStartGameWithoutUserWords],
  );

  const restartGame = useCallback(() => {
    resetGame();
    toggleStatisticsPage();
  }, [resetGame, toggleStatisticsPage]);

  if (isRedirectToLoginPage) {
    <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: ROUTES.GAMES } }} />;
  }

  return (
    userDictionary && (
      <div>
        <ExitButton />

        {isGameStarted ? (
          isItShowingStatistics ? (
            <StatisticsAfterGame
              statistics={arrOfWords.map(({ audio, word, wordTranslate, isItAnswered }) => ({
                word,
                translation: wordTranslate,
                wordAudio: audio,
                isCorrectAnswer: isItAnswered,
              }))}
              restartGame={restartGame}
            />
          ) : (
            <div className={classes.mainContainer}>
              <Background right={arrOfWords.filter(e => e.isItAnswered).length} />
              <div className={classes.box}>
                <div className={classes.column}>
                  <Illustration />
                  <Translation />
                  <Star />
                  <div className={classes.words}>{listOfWords}</div>
                  <div className={classes.buttons}>
                    <span className={classes.btn}>
                      <Button text="Restart" onClickFunc={resetGame} />
                    </span>
                    <span className={classes.btn}>
                      <Button text="Speak please" onClickFunc={startSpeechRecognition} className={classes.btn} />
                    </span>
                    <span className={classes.btn}>
                      <Button text="Results" onClickFunc={toggleStatisticsPage} className={classes.btn} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <GameDescription
            gameName={GAME_INFO.NAME}
            shortDescription={GAME_INFO.SHORT_DESCRIPTION}
            onStartGameWithUserWords={onStartGameWithUserWords}
            onStartGameWithRandomWords={onStartGameWithoutUserWords}
          />
        )}
      </div>
    )
  );
};
