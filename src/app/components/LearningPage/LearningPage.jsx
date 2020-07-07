/* eslint-disable indent */
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { statisticsService } from '../../services/StatisticsService/StatisticsService';
import {
  setCommonStatistics,
  setLastVisiting,
} from '../StatisticsPage/store/common-statistics/CommonStatistics.action';
import {
  setRepeatedWordsId,
  setLearnedWordsId,
  setMaxSeriesLength,
  setMistakesNumber,
  setCardsCounter,
  setIsWasShownCardsStatistics,
  setIsWasShownNewWordsStatistics,
} from '../StatisticsPage/store/daily-statistics/DailyStatistics.actions';
import { updateUserWord, addUserWord } from '../DictionaryPage/store/UserDictionary.actions';
import { userDictionarySelector } from '../DictionaryPage/store/UserDictionary.selectors';
import { settingsSelector } from '../SettingsPage/store/Settings.selectors';
import { WORD_GAME_STATE, SETTINGS, WORD_STATUS_PICKER_GAME_MODE_MAP, GAME_MODE } from './LearningPage.models';
import { dailyStatisticsSelector } from '../StatisticsPage/store/daily-statistics/DailyStatistics.selectors';
import { commonStatisticsSelector } from '../StatisticsPage/store/common-statistics/CommonStatistics.selectors';
import { WordCard } from './components/WordCard/WordCard';
import { WordStatusPicker } from './components/WordStatusPicker/WordStatusPicker';
import { learningPageConfigSelector } from './store/LearningPage.selectors';
import { USER_OPINION_ABOUT_WORD } from './components/UserWordAssessment/UserWordAssessment.models';
import { UserWordAssessment } from './components/UserWordAssessment/UserWordAssessment';
import { createUserWord, WORD_STATUS } from '../DictionaryPage/DictionaryPage.models';
import { createCommonStatistics } from '../StatisticsPage/store/common-statistics/create-common-statistics';
import { statisticsSelector } from '../StatisticsPage/store/Statistics.selectors';
import { ProgressStrip } from './components/ProgressStrip/ProgressStrip';
import { DailyStatistics } from './components/DailyStatistics/DailyStatistics';
import { setIsTranslationVisible } from '../SettingsPage/store/Settings.actions';
import { Toggle } from '../SettingsPage/components/Toggle';
import { setLearningPageConfig } from './store/LearningPage.actions';
import { createLearningPageConfig } from './store/create-learning-page-config';
import { useInitializeGame } from './hooks/useInitializeGame';
import { useUpdateBackend } from './hooks/useUpdateBackend';
import { useStyles } from './LearningPage.styles';
import { authorizationInfoSelector } from '../AuthorizationPage/store/AuthorizationPage.selectors';
import { ROUTES } from './../../routing/routes';
import { loadDictionary, loadSettings, loadStatistics, checkIsAllStatisticsLoaded } from './store/LearningPage.thunks';
import { Menu } from '../Menu/Menu';
import { Button } from './components/UserWordAssessment/Button/Button';
import { PROGRESS_TYPE } from './components/ProgressStrip/ProgressPart.models';
import { useCheckCommonStatistics } from '../common/hooks/useCheckCommonStatistics';
import { StartPage } from './components/StartPage/StartPage';
import { NothingToLearnPage } from './components/NothingToLearnPage/NothingToLearnPage';
import { Loading } from '../common/components/Loading/Loading';

export const LearningPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const authorizationInfo = useSelector(authorizationInfoSelector);
  const { repeatableWordStatus } = useSelector(learningPageConfigSelector);
  const userDictionary = useSelector(userDictionarySelector);
  const settings = useSelector(settingsSelector);
  const dailyStatistics = useSelector(dailyStatisticsSelector);
  const commonStatistics = useSelector(commonStatisticsSelector);
  const statistics = useSelector(statisticsSelector);

  const [isStatisticsPrepared, setIsStatisticsPrepared] = useState(false);
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);
  const [isDictionaryCategoryChosen, setIsDictionaryCategoryChosen] = useState(false);
  const [isGameConfigChosen, setIsGameConfigChosen] = useState(repeatableWordStatus === GAME_MODE.DIFFICULT);
  const [isGamePrepared, setIsGamePrepared] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isShowWordDifficultyAssessment, setIsShowWordDifficultyAssessment] = useState(false);
  const [indexCurrentWord, setIndexCurrentWord] = useState(null);
  const [gameWords, setGameWords] = useState(null);
  const [isLocalUserInfoUpdated, setIsLocalUserInfoUpdated] = useState(false);
  const [isWasMistake, setIsWasMistake] = useState(false);
  const [changesInUserDictionary, setChangesInUserDictionary] = useState(null);
  const [isShowDailyStatistics, setIsShowDailyStatistics] = useState(false);
  const [lengthSeriesCorrectAnswers, setLengthSeriesCorrectAnswers] = useState(0);
  const [autoPlayMode, setAutoPlayMode] = useState(true);
  const backendUpdatingAbortController = useRef(null);

  const continueGame = useMemo(
    () => () => {
      setIsShowWordDifficultyAssessment(false);
      setIsShowAnswer(false);
      setIsWasMistake(false);
      setIsShowDailyStatistics(false);
      setIsDictionaryCategoryChosen(false);

      if (indexCurrentWord === gameWords.length - 1) {
        setIsGameEnded(true);
        return;
      }
      setIndexCurrentWord(index => index + 1);
    },
    [indexCurrentWord, gameWords],
  );

  useEffect(
    () => () => {
      if (backendUpdatingAbortController.current) {
        backendUpdatingAbortController.current.abort();
      }
    },
    [],
  );

  useEffect(() => {
    if (userDictionary) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadDictionary({ setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [userDictionary, dispatch]);

  useEffect(() => {
    if (settings) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadSettings({ setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [settings, dispatch]);

  useEffect(() => {
    if (isStatisticsPrepared) {
      return;
    }

    if (checkIsAllStatisticsLoaded({ statistics })) {
      setIsStatisticsPrepared(true);
      return;
    }

    const controller = new AbortController();

    dispatch(loadStatistics({ setIsRedirectToLoginPage, setIsStatisticsPrepared, controller }));

    return () => controller.abort();
  }, [statistics, dispatch, isStatisticsPrepared]);

  useCheckCommonStatistics({
    statistics,
    dispatch,
    setIsRedirectToLoginPage,
    setIsStatisticsPrepared,
  });

  useEffect(
    () => () =>
      dispatch(setLearningPageConfig(createLearningPageConfig({ repeatableWordStatus: GAME_MODE.LEARNED_AND_NEW }))),
    [dispatch],
  );

  useEffect(() => {
    if (isGameEnded) {
      statisticsService.updateStatistics({
        token: authorizationInfo.token,
        userId: authorizationInfo.userId,
        statistics,
        controller: new AbortController(),
      });
    }
  }, [isGameEnded, statistics, authorizationInfo, dispatch]);

  useInitializeGame({
    setGameWords,
    setIndexCurrentWord,
    setIsGamePrepared,
    isStatisticsPrepared,
    isGamePrepared,
    isGameConfigChosen,
  });

  useUpdateBackend({
    isLocalUserInfoUpdated,
    changesInUserDictionary,
    setIsLocalUserInfoUpdated,
    setIsShowDailyStatistics,
    continueGame,
    dispatch,
    isWasMistake,
    setIsRedirectToLoginPage,
  });

  const onCorrectInput = useCallback(() => {
    if (isLocalUserInfoUpdated) {
      return;
    }

    const currentGameWord = gameWords[indexCurrentWord];
    const word = userDictionary.find(word => word.wordId === gameWords[indexCurrentWord].id);
    if (currentGameWord.gameState === WORD_GAME_STATE.LEARNED || word) {
      const updatedWord = createUserWord({
        ...word,
        repetitionNumber: isShowAnswer ? word.repetitionNumber : word.repetitionNumber + 1,
        lastRepetition: Date.now(),
        isWasMistakeInLastGame: false,
        status: WORD_STATUS.LEARNED,
      });
      dispatch(updateUserWord(updatedWord));

      if (!dailyStatistics.repeatedWordsId.includes(currentGameWord.id)) {
        dispatch(setRepeatedWordsId([...dailyStatistics.repeatedWordsId, currentGameWord.id]));
      }
      setChangesInUserDictionary({ word: updatedWord, gameState: WORD_GAME_STATE.LEARNED });
    } else {
      const newWord = createUserWord({
        wordId: currentGameWord.id,
        status: WORD_STATUS.LEARNED,
        lastRepetition: Date.now(),
        isWasMistakeInLastGame: false,
      });
      dispatch(addUserWord(newWord));
      dispatch(setLearnedWordsId([...dailyStatistics.learnedWordsId, currentGameWord.id]));
      updateCommonStatistics({
        learnedWord: currentGameWord.wordPosition,
        dispatch,
        oldCommonStatistics: commonStatistics,
      });
      setChangesInUserDictionary({ word: newWord, gameState: WORD_GAME_STATE.NEW });
    }

    dispatch(setLastVisiting(Date.now()));

    dispatch(setCardsCounter(dailyStatistics.cardsCounter + 1));

    if (!isShowAnswer) {
      if (lengthSeriesCorrectAnswers + 1 > dailyStatistics.maxSeriesLength) {
        dispatch(setMaxSeriesLength(lengthSeriesCorrectAnswers + 1));
      }
      setLengthSeriesCorrectAnswers(length => length + 1);
    }

    setIsWasMistake(false);

    if (settings.isUserOpinionCheckingVisible) {
      setIsShowWordDifficultyAssessment(true);
      return;
    }

    setIsLocalUserInfoUpdated(true);
  }, [
    indexCurrentWord,
    gameWords,
    userDictionary,
    isShowAnswer,
    dispatch,
    settings,
    lengthSeriesCorrectAnswers,
    dailyStatistics,
    commonStatistics,
    isLocalUserInfoUpdated,
  ]);

  const onIncorrectInput = useCallback(() => {
    if (isLocalUserInfoUpdated) {
      return;
    }

    const currentGameWord = gameWords[indexCurrentWord];
    const word = userDictionary.find(word => word.wordId === gameWords[indexCurrentWord].id);
    if (currentGameWord.gameState === WORD_GAME_STATE.LEARNED || word) {
      const updatedWord = createUserWord({
        ...word,
        repetitionNumber: word.repetitionNumber + 1,
        mistakesNumber: word.mistakesNumber + 1,
        lastRepetition: Date.now(),
        isWasMistakeInLastGame: false,
        status: WORD_STATUS.LEARNED,
      });
      dispatch(updateUserWord(updatedWord));

      if (!dailyStatistics.repeatedWordsId.includes(currentGameWord.id)) {
        dispatch(setRepeatedWordsId([...dailyStatistics.repeatedWordsId, currentGameWord.id]));
      }
      setChangesInUserDictionary({ word: updatedWord, gameState: WORD_GAME_STATE.LEARNED });
    } else {
      const newWord = createUserWord({
        wordId: currentGameWord.id,
        status: WORD_STATUS.LEARNED,
        lastRepetition: Date.now(),
        isWasMistakeInLastGame: false,
      });
      dispatch(addUserWord(newWord));
      dispatch(setLearnedWordsId([...dailyStatistics.learnedWordsId, currentGameWord.id]));
      updateCommonStatistics({
        learnedWord: currentGameWord.wordPosition,
        dispatch,
        oldCommonStatistics: commonStatistics,
      });
      setChangesInUserDictionary({ word: newWord, gameState: WORD_GAME_STATE.NEW });
    }

    dispatch(setLastVisiting(Date.now()));

    setLengthSeriesCorrectAnswers(0);

    dispatch(setMistakesNumber(dailyStatistics.mistakesNumber + 1));

    const newGameWord = { ...gameWords[indexCurrentWord], gameState: WORD_GAME_STATE.LEARNED };
    setGameWords([...gameWords, newGameWord]);

    setIsWasMistake(true);

    setIsLocalUserInfoUpdated(true);
  }, [
    dispatch,
    userDictionary,
    indexCurrentWord,
    gameWords,
    dailyStatistics,
    commonStatistics,
    isLocalUserInfoUpdated,
  ]);

  const onShowAnswerClick = useCallback(() => setIsShowAnswer(true), []);

  const onWordStatusChoice = useCallback(
    newStatus => {
      const currentGameWord = gameWords[indexCurrentWord];
      if (currentGameWord.gameState === WORD_GAME_STATE.LEARNED) {
        if (gameWords[indexCurrentWord].status === newStatus) {
          return;
        }

        const wordInfo = userDictionary.find(word => word.wordId === gameWords[indexCurrentWord].id);
        const updatedWordInfo = createUserWord({ ...wordInfo, status: newStatus });
        dispatch(updateUserWord(updatedWordInfo));

        setChangesInUserDictionary(changes => ({ ...changes, word: { ...updatedWordInfo } }));
        setIsDictionaryCategoryChosen(true);
      }
    },
    [gameWords, indexCurrentWord, userDictionary, dispatch],
  );

  const onAssessmentClick = useCallback(
    assessment => {
      const currentGameWord = gameWords[indexCurrentWord];
      const wordInfo = userDictionary.find(word => word.wordId === gameWords[indexCurrentWord].id);
      const updatedWordInfo = createUserWord({ ...wordInfo, userOpinionAboutWord: assessment });
      dispatch(updateUserWord(updatedWordInfo));
      setChangesInUserDictionary(changes => ({ ...changes, word: { ...updatedWordInfo } }));

      dispatch(setLastVisiting(Date.now()));

      if (assessment === USER_OPINION_ABOUT_WORD.REPEAT) {
        const newGameWord = { ...currentGameWord, gameState: WORD_GAME_STATE.LEARNED };
        setGameWords([...gameWords, newGameWord]);
      }

      setIsLocalUserInfoUpdated(true);
    },
    [dispatch, userDictionary, indexCurrentWord, gameWords],
  );

  const onAutoPlayToggleClick = useCallback(() => setAutoPlayMode(mode => !mode), []);

  const onContinueGameClick = useCallback(() => {
    if (
      dailyStatistics.cardsCounter === settings.maxCardsNumberPerDay &&
      dailyStatistics.learnedWordsId.length === settings.maxNewWordsPerDay
    ) {
      dispatch(setIsWasShownCardsStatistics(true));
      dispatch(setIsWasShownNewWordsStatistics(true));
    }

    if (
      dailyStatistics.cardsCounter === settings.maxCardsNumberPerDay &&
      dailyStatistics.learnedWordsId.length !== settings.maxNewWordsPerDay
    ) {
      dispatch(setIsWasShownCardsStatistics(true));
    }

    if (
      dailyStatistics.learnedWordsId.length === settings.maxNewWordsPerDay &&
      dailyStatistics.cardsCounter !== settings.maxCardsNumberPerDay
    ) {
      dispatch(setIsWasShownNewWordsStatistics(true));
    }
    continueGame();
  }, [dailyStatistics, settings, dispatch, continueGame]);

  const onToggleClick = useCallback(
    (action, state) => {
      if (
        action !== setIsTranslationVisible ||
        settings.isWordDescriptionVisible ||
        settings.isExampleSentenceVisible
      ) {
        dispatch(action(state));
      }
    },
    [dispatch, settings],
  );

  const onRestartClick = useCallback(() => {
    setIsGamePrepared(false);
    setIsGameEnded(false);
  }, []);

  const onOpenStatisticsClick = useCallback(() => history.push(ROUTES.STATISTIC), [history]);

  const onGameConfigChosenClick = useCallback(() => setIsGameConfigChosen(true), []);

  const onOpenStartPageClick = useCallback(() => {
    setIsGameConfigChosen(false);
    setIsGamePrepared(false);
    setGameWords(null);
  }, []);

  if (isRedirectToLoginPage) {
    return <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: ROUTES.LEARNING } }} />;
  }

  if (isShowDailyStatistics && isStatisticsPrepared) {
    return (
      <div className={classes.pageWrapper}>
        <Menu />
        <div className={classes.statisticsWrapper}>
          <DailyStatistics
            settings={settings}
            dailyStatistics={dailyStatistics}
            onContinueGameClick={onContinueGameClick}
            isGameEnd={false}
          />
        </div>
      </div>
    );
  }

  if (!isGameConfigChosen) {
    return <StartPage onStartClick={onGameConfigChosenClick} />;
  }

  if (isGamePrepared && !isGameEnded) {
    return (
      <div className={classes.pageWrapper}>
        <Menu />
        <div className={classes.componentsWrapper}>
          <div className={classes.componentsContainer}>
            <div className={classes.learningInfoContainer}>
              <WordCard
                wordInfo={gameWords[indexCurrentWord]}
                onCorrectInput={onCorrectInput}
                onIncorrectInput={onIncorrectInput}
                onShowAnswerClick={onShowAnswerClick}
                onAutoPlayToggle={onAutoPlayToggleClick}
                isAutoPlayActive={autoPlayMode}
                isShowAnswer={isShowAnswer}
                gameWordIndex={indexCurrentWord}
              />
              {!isDictionaryCategoryChosen &&
                settings.isStatusCheckingVisible &&
                gameWords[indexCurrentWord].userInfo &&
                gameWords[indexCurrentWord].userInfo.status !== WORD_STATUS.DEFAULT && (
                  <WordStatusPicker
                    wordStatuses={WORD_STATUS_PICKER_GAME_MODE_MAP.get(repeatableWordStatus)}
                    onStatusChoice={onWordStatusChoice}
                  />
                )}
              {isShowWordDifficultyAssessment && <UserWordAssessment onChangeStatusClick={onAssessmentClick} />}
              <div className={classes.ghostContainer}></div>
              <ProgressStrip
                currentProgress={indexCurrentWord}
                partsNumber={gameWords.length}
                progressType={PROGRESS_TYPE.GAME_PROGRESS}
                supremum={gameWords.length}
              />
            </div>
            <div className={classes.settingsContainer}>
              {SETTINGS.map(({ option, name, action }) => (
                <div key={option}>
                  <div>{option}</div>
                  <Toggle defaultState={settings[name]} action={action} toggleClick={onToggleClick} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isGameEnded && isGamePrepared) {
    return (
      <div className={classes.pageWrapper}>
        <Menu />
        <div className={classes.endGameContainer}>
          <DailyStatistics
            settings={settings}
            dailyStatistics={dailyStatistics}
            onContinueGameClick={onContinueGameClick}
            isGameEnd={true}
          />
          <div className={classes.endGameButtonsContainer}>
            <Button styleClasses={classes.buttonStyle} onClick={onOpenStatisticsClick} message={'Open Statistics'} />
            <Button styleClasses={classes.buttonStyle} onClick={onRestartClick} message={'Restart'} />
          </div>
        </div>
      </div>
    );
  }

  if (gameWords && !gameWords.length) {
    return <NothingToLearnPage onOpenStartPageClick={onOpenStartPageClick} />;
  }

  return <Loading />;
};

const updateCommonStatistics = ({
  learnedWord: { group, page, index },
  dispatch,
  oldCommonStatistics: {
    lastLearnedWord: { group: previousGroup, page: previousPage, index: previousIndex },
  },
}) => {
  if (group > previousGroup) {
    dispatch(setCommonStatistics(createCommonStatistics({ lastLearnedWord: { group, page, index } })));
  }
  if (group === previousGroup && page > previousPage) {
    dispatch(setCommonStatistics(createCommonStatistics({ lastLearnedWord: { group, page, index } })));
  }

  if (group === previousGroup && page === previousPage && index > previousIndex) {
    dispatch(setCommonStatistics(createCommonStatistics({ lastLearnedWord: { group, page, index } })));
  }
};
