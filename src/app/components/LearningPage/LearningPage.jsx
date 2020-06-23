/* eslint-disable indent */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { commonSettingsSelector } from '../StatisticsPage/store/common-statistics/CommonStatistics.selectors';
import { WordCard } from './components/WordCard/WordCard';
import { WordStatusPicker } from './components/WordStatusPicker/WordStatusPicker';
import { learningPageConfigSelector } from './store/LearningPage.selectors';
import { USER_OPINION_ABOUT_WORD } from './components/UserWordAssessment/UserWordAssessment.models';
import { UserWordAssessment } from './components/UserWordAssessment/UserWordAssessment';
import { createUserWord, WORD_STATUS } from '../DictionaryPage/DictionaryPage.models';
import { createCommonStatistics } from '../StatisticsPage/store/common-statistics/create-common-statistics';
import { statisticsSelector } from '../StatisticsPage/store/Statistics.selectors';
import { authorizationInfoSelector } from '../../store/App.selectors';
import { ProgressStrip } from './components/ProgressStrip/ProgressStrip';
import { DailyStatistics } from './components/DailyStatistics/DailyStatistics';
import { setIsTranslationVisible } from '../SettingsPage/store/Settings.actions';
import { Toggle } from '../SettingsPage/components/Toggle';
import { setLearningPageConfig } from './store/LearningPage.actions';
import { createLearningPageConfig } from './store/create-learning-page-config';
import { useInitializeGame } from './hooks/useInitializeGame';
import { useUpdateBackend } from './hooks/useUpdateBackend';
import { useStyles } from './LearningPage.styles';

export const LearningPage = () => {
  const [isStorePrepared] = useState(false);

  const classes = useStyles();
  const { token, userId } = useSelector(authorizationInfoSelector);
  const { repeatableWordStatus } = useSelector(learningPageConfigSelector);
  const userDictionary = useSelector(userDictionarySelector);
  const settings = useSelector(settingsSelector);
  const dailyStatistics = useSelector(dailyStatisticsSelector);
  const commonStatistics = useSelector(commonSettingsSelector);
  const statistics = useSelector(statisticsSelector);

  const dispatch = useDispatch();

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

  const continueGame = useMemo(
    () => () => {
      setIsShowWordDifficultyAssessment(false);
      setIsShowAnswer(false);
      setIsWasMistake(false);
      setIsShowDailyStatistics(false);

      if (indexCurrentWord === gameWords.length - 1) {
        setIsGameEnded(true);
        return;
      }
      setIndexCurrentWord(index => index + 1);
    },
    [indexCurrentWord, gameWords],
  );

  useInitializeGame({ setGameWords, setIndexCurrentWord, setIsGamePrepared, isStorePrepared, isGamePrepared });

  useUpdateBackend({
    isLocalUserInfoUpdated,
    changesInUserDictionary,
    setIsLocalUserInfoUpdated,
    setIsShowDailyStatistics,
    continueGame,
    dispatch,
    isWasMistake,
  });

  useEffect(() => {
    if (isGameEnded) {
      dispatch(setLearningPageConfig(createLearningPageConfig({ repeatableWordStatus: GAME_MODE.LEARNED_AND_NEW })));
      statisticsService.updateStatistics({ token, userId, statistics, controller: new AbortController() });
    }
  }, [isGameEnded, statistics, token, userId, dispatch]);

  const onCorrectInput = useCallback(() => {
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
        mistakesNumber: 0,
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
  ]);

  const onIncorrectInput = useCallback(() => {
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
  }, [dispatch, userDictionary, indexCurrentWord, gameWords, dailyStatistics, commonStatistics]);

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

  if (isShowDailyStatistics) {
    return (
      <div className={classes.wrapper}>
        <DailyStatistics
          settings={settings}
          dailyStatistics={dailyStatistics}
          onContinueGameClick={onContinueGameClick}
        />
      </div>
    );
  }

  if (isGamePrepared && !isGameEnded) {
    return (
      <div className={classes.wrapper}>
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
            {settings.isStatusCheckingVisible &&
              gameWords[indexCurrentWord].userInfo &&
              gameWords[indexCurrentWord].userInfo.status !== WORD_STATUS.DEFAULT && (
                <div>
                  <WordStatusPicker
                    wordStatuses={WORD_STATUS_PICKER_GAME_MODE_MAP.get(repeatableWordStatus)}
                    onStatusChoice={onWordStatusChoice}
                  />
                </div>
              )}
            {isShowWordDifficultyAssessment && (
              <div>
                <UserWordAssessment onChangeStatusClick={onAssessmentClick} />
              </div>
            )}
            <div className={classes.ghostContainer}></div>
            <ProgressStrip currentProgress={indexCurrentWord} partsNumber={gameWords.length} />
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
    );
  }

  if (isGameEnded) {
    return (
      isGameEnded && (
        <div className={classes.wrapper}>
          <h1>The End</h1>
        </div>
      )
    );
  }

  if (gameWords && !gameWords.length && !indexCurrentWord) {
    return (
      <div className={classes.wrapper}>
        <h1>Nothing to learn</h1>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <h1>Hello</h1>
    </div>
  );
};

const updateCommonStatistics = ({
  learnedWord: { group, page, index },
  dispatch,
  oldCommonStatistics: {
    lastLearnedWord: { group: previousGroup, page: previousPage, index: previousIndex },
  },
}) => {
  if (group >= previousGroup && page >= previousPage && index >= previousIndex) {
    dispatch(setCommonStatistics(createCommonStatistics({ lastLearnedWord: { group, page, index } })));
  }
};
