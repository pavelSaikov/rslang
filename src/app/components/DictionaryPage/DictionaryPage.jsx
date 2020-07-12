import React, { useState, useCallback, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { WORD_STATUS, WORD_STATUSES, createUserWord, WORD_STATUS_TRANSLATION_MAP } from './DictionaryPage.models.js';
import { useStyles } from './DictionaryPage.styles.js';
import { WordInfo } from './components/WordInfo/WordInfo.jsx';
import { StatusTab } from './components/StatusTab/StatusTab.jsx';
import { wordsService } from '../../services/WordsService/WordsService.js';
import { updateUserWord } from './store/UserDictionary.actions.js';
import { userDictionarySelector } from './store/UserDictionary.selectors.js';
import { authorizationInfoSelector } from '../AuthorizationPage/store/AuthorizationPage.selectors.js';
import { ROUTES } from '../../routing/routes.js';
import { Menu } from '../Menu/Menu.jsx';
import { settingsSelector } from '../SettingsPage/store/Settings.selectors.js';
import { loadDictionary, loadSettings, loadStatistics } from '../LearningPage/store/LearningPage.thunks.js';
import { statisticsSelector } from '../StatisticsPage/store/Statistics.selectors.js';
import { updateUserWordAndStatistics } from './store/UserDictionary.thunks.js';
import { Button } from '../LearningPage/components/UserWordAssessment/Button/Button.js';
import { setLearningPageConfig } from '../LearningPage/store/LearningPage.actions.js';
import { createLearningPageConfig } from '../LearningPage/store/create-learning-page-config.js';
import { GAME_MODE } from '../LearningPage/LearningPage.models.js';
import { Loading } from '../common/components/Loading/Loading.jsx';

export const DictionaryPage = () => {
  const userDictionary = useSelector(userDictionarySelector);
  const authorizationInfo = useSelector(authorizationInfoSelector);
  const { commonStatistics, dailyStatistics } = useSelector(statisticsSelector);
  const settings = useSelector(settingsSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);
  const [wordsDescription, setWordDescription] = useState(null);
  const [wordsStatusForView, setWordsStatusForView] = useState(WORD_STATUS.LEARNED);
  const [updatedWordInfo, setUpdatedWordInfo] = useState(null);
  const classes = useStyles();

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
  }, [dispatch, settings]);

  useEffect(() => {
    if (commonStatistics && dailyStatistics) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadStatistics({ setIsRedirectToLoginPage, setIsStatisticsPrepared: () => {}, controller }));

    return () => controller.abort();
  }, [dispatch, commonStatistics, dailyStatistics]);

  useEffect(() => {
    if (!userDictionary || wordsDescription) {
      return;
    }

    Promise.all(
      userDictionary.map(wordUserInfo =>
        wordsService.getWordInfo({ wordId: wordUserInfo.wordId }).then(wordInfo => ({ ...wordInfo, ...wordUserInfo })),
      ),
    ).then(words => setWordDescription(words));
  }, [userDictionary, wordsDescription]);

  useEffect(() => {
    if (updatedWordInfo) {
      const controller = new AbortController();
      dispatch(
        updateUserWordAndStatistics({ updatedWordInfo, setUpdatedWordInfo, setIsRedirectToLoginPage, controller }),
      );

      return () => controller.abort();
    }
  }, [updatedWordInfo, authorizationInfo, commonStatistics, dailyStatistics, dispatch]);

  const onViewStatusChangeClick = useCallback(
    newWordStatusForView => {
      if (wordsStatusForView !== newWordStatusForView) {
        setWordsStatusForView(newWordStatusForView);
      }
    },
    [wordsStatusForView],
  );

  const onStatusChangeClick = useCallback(
    (status, wordId) => {
      if (updatedWordInfo) {
        return;
      }

      const otherWords = wordsDescription.filter(word => word.wordId !== wordId);
      const targetWord = { ...wordsDescription.find(word => word.wordId === wordId), status };
      setWordDescription([targetWord, ...otherWords]);
      dispatch(updateUserWord(createUserWord({ ...targetWord })));
      setUpdatedWordInfo(createUserWord({ ...targetWord }));
    },
    [wordsDescription, dispatch, updatedWordInfo],
  );

  const onRepeatButtonClick = useCallback(() => {
    dispatch(setLearningPageConfig(createLearningPageConfig({ repeatableWordStatus: GAME_MODE.DIFFICULT })));
    history.push(ROUTES.LEARNING);
  }, [dispatch, history]);

  if (isRedirectToLoginPage) {
    return <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: ROUTES.DICTIONARY } }} />;
  }

  if (wordsDescription && commonStatistics && dailyStatistics) {
    return (
      <div className={classes.pageContainer}>
        <Menu />
        <div className={classes.dictionaryContainer}>
          <div className={classes.header}>
            <div className={classes.wordStatusesContainer}>
              {WORD_STATUSES.map(status => (
                <StatusTab
                  key={status}
                  translation={WORD_STATUS_TRANSLATION_MAP.get(status)}
                  status={status}
                  onViewStatusChangeClick={onViewStatusChangeClick}
                  isSelected={status === wordsStatusForView}
                />
              ))}
            </div>
            {wordsStatusForView === WORD_STATUS.DIFFICULT && (
              <div className={classes.repeatButtonContainer}>
                <Button
                  message={'Повторить сложные слова'}
                  styleClasses={classes.repeatButton}
                  onClick={onRepeatButtonClick}
                />
              </div>
            )}
          </div>
          <div className={classes.wordsGroupContainer}>
            {wordsDescription.map(wordInfo => {
              if (wordInfo.status === wordsStatusForView) {
                return (
                  <WordInfo
                    key={wordInfo.wordId}
                    wordInfo={wordInfo}
                    onStatusChangeClick={onStatusChangeClick}
                    newStatus={wordsStatusForView === WORD_STATUS.LEARNED ? WORD_STATUS.DIFFICULT : WORD_STATUS.LEARNED}
                    isRemovable={wordsStatusForView !== WORD_STATUS.REMOVED ? true : false}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }

  return <Loading />;
};
