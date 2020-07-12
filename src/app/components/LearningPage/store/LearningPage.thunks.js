import { wordsService } from '../../../services/WordsService/WordsService';
import { store } from '../../../store';
import { setUserDictionary, updateUserWord } from './../../DictionaryPage/store/UserDictionary.actions';
import { settingsService } from './../../../services/SettingsService/SettingsService';
import { setSettings } from './../../SettingsPage/store/Settings.actions';
import { statisticsService } from '../../../services/StatisticsService/StatisticsService';
import { createCommonStatistics } from '../../StatisticsPage/store/common-statistics/create-common-statistics';
import { createDailyStatistics } from '../../StatisticsPage/store/daily-statistics/create-daily-statistics';
import { setDailyStatistics } from '../../StatisticsPage/store/daily-statistics/DailyStatistics.actions';
import { setCommonStatistics } from '../../StatisticsPage/store/common-statistics/CommonStatistics.action';
import { ERROR_MESSAGE_WORDS_SERVICE } from '../../../services/WordsService/WordsService.models';
import { addError } from '../../errors/store/Errors.actions';
import { setAuthorizationInfo } from '../../AuthorizationPage/store/AuthorizationPage.actions';
import { ERROR_MESSAGE_SETTINGS_SERVICE } from '../../../services/SettingsService/SettingsService.models';
import { ERROR_MESSAGE_STATISTICS_SERVICE } from '../../../services/StatisticsService/StatisticsService.models';
import { createUserWord } from '../../DictionaryPage/DictionaryPage.models';
import { setLongTermStatistics } from '../../StatisticsPage/store/long-term-statistics/LongTermStatistics.actions';
import {
  createLongTermStatistics,
  createLongTermStatisticsItem,
} from '../../StatisticsPage/store/long-term-statistics/LongTermStatistics.models';
import { setSpeakItStatistics } from '../../GamesPage/components/SpeakIt/store/SpeakIt.action';
import { setSprintStatistics } from '../../GamesPage/components/Sprint/store/sprint-statistics/SprintStatistics.action';
import { setSavannaStatistics } from '../../GamesPage/components/Savanna/store/Savanna.actions';
import { setAudioChallengeStatistics } from '../../GamesPage/components/AudioChallenge/store/AudioChallenge.action';

const USER_ABORT_REQUEST = 'The user aborted a request.';

export const loadDictionary = ({ setIsRedirectToLoginPage, controller }) => dispatch => {
  const { authorizationInfo } = store.getState();

  if (!authorizationInfo) {
    setIsRedirectToLoginPage(true);
    return;
  }

  wordsService
    .getAllUserWords({ token: authorizationInfo.token, userId: authorizationInfo.userId, controller })
    .then(words => {
      dispatch(setUserDictionary(words));
    })
    .catch(e => {
      if (e.message === ERROR_MESSAGE_WORDS_SERVICE.INVALID_ACCESS_TOKEN) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
        return;
      }

      if (e.message === USER_ABORT_REQUEST) {
        return;
      }

      dispatch(addError(e.message));
    });
};

export const loadSettings = ({ setIsRedirectToLoginPage, controller }) => dispatch => {
  const { authorizationInfo } = store.getState();

  if (!authorizationInfo) {
    setIsRedirectToLoginPage(true);
    return;
  }

  settingsService
    .getUserSettings({ token: authorizationInfo.token, userId: authorizationInfo.userId, controller })
    .then(settings => dispatch(setSettings(settings)))
    .catch(e => {
      if (e.message === ERROR_MESSAGE_SETTINGS_SERVICE.INVALID_ACCESS_TOKEN) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
        return;
      }

      if (e.message === USER_ABORT_REQUEST) {
        return;
      }

      dispatch(addError(e.message));
    });
};

export const resetDailyStatistics = ({
  statistics,
  setIsRedirectToLoginPage,
  setIsStatisticsPrepared,
  controller,
}) => dispatch => {
  const { authorizationInfo } = store.getState();

  if (!authorizationInfo) {
    setIsRedirectToLoginPage(true);
    return;
  }

  if (!checkIsAllStatisticsLoaded({ statistics })) {
    return;
  }

  const updatedStatistics = {
    ...statistics,
    commonStatistics: createCommonStatistics({ ...statistics.commonStatistics }),
    dailyStatistics: createDailyStatistics({}),
    longTermStatistics: createLongTermStatistics({
      longTermStatistics: [...statistics.longTermStatistics, createLongTermStatisticsItem({ ...statistics })],
    }),
  };

  return statisticsService
    .updateStatistics({
      token: authorizationInfo.token,
      userId: authorizationInfo.userId,
      statistics: updatedStatistics,
      controller,
    })
    .then(() => {
      setAllStatistics({ statistics: updatedStatistics, dispatch });
      setIsStatisticsPrepared(true);
    })
    .catch(e => {
      if (e.message === ERROR_MESSAGE_STATISTICS_SERVICE.INVALID_ACCESS_TOKEN) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
        return;
      }

      if (e.message === USER_ABORT_REQUEST) {
        return;
      }

      dispatch(addError(e.message));
    });
};

export const loadStatistics = ({ setIsRedirectToLoginPage, setIsStatisticsPrepared, controller }) => dispatch => {
  const { authorizationInfo } = store.getState();

  if (!authorizationInfo) {
    setIsRedirectToLoginPage(true);
    return;
  }

  return statisticsService
    .getUserStatistics({
      token: authorizationInfo.token,
      userId: authorizationInfo.userId,
      controller,
    })
    .then(statistics => {
      if (statisticsService.isStatisticsResetNeeded({ commonStatistics: statistics.commonStatistics })) {
        return resetDailyStatistics({ statistics, setIsRedirectToLoginPage, setIsStatisticsPrepared, controller })(
          dispatch,
        );
      }

      setAllStatistics({ statistics, dispatch });
      setIsStatisticsPrepared(true);
    })
    .catch(e => {
      if (e.message === ERROR_MESSAGE_STATISTICS_SERVICE.INVALID_ACCESS_TOKEN) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
        return;
      }

      if (e.message === USER_ABORT_REQUEST) {
        return;
      }

      dispatch(addError(e.message));
    });
};

export const updateCommonStatistics = ({ setIsRedirectToLoginPage, controller }) => dispatch => {
  const { authorizationInfo, statistics } = store.getState();

  if (!authorizationInfo) {
    setIsRedirectToLoginPage(true);
    return;
  }

  if (!checkIsAllStatisticsLoaded({ statistics })) {
    return;
  }

  if (statisticsService.isStatisticsResetNeeded({ commonStatistics: statistics.commonStatistics })) {
    return dispatch(
      resetDailyStatistics({ statistics, setIsRedirectToLoginPage, setIsStatisticsPrepared: () => {}, controller }),
    )(dispatch);
  }

  const updatedStatistics = {
    ...statistics,
    commonStatistics: createCommonStatistics({ ...statistics.commonStatistics }),
  };

  return statisticsService
    .updateStatistics({
      token: authorizationInfo.token,
      userId: authorizationInfo.userId,
      statistics: updatedStatistics,
      controller,
    })
    .then(() => setAllStatistics({ statistics: updatedStatistics, dispatch }))
    .catch(e => {
      if (e.message === ERROR_MESSAGE_STATISTICS_SERVICE.INVALID_ACCESS_TOKEN) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
        return;
      }

      if (e.message === USER_ABORT_REQUEST) {
        return;
      }

      dispatch(addError(e.message));
    });
};

export const modifyUserWord = ({ setIsRedirectToLoginPage, controller, updatedWordInfo }) => dispatch => {
  const { authorizationInfo } = store.getState();

  if (!authorizationInfo) {
    setIsRedirectToLoginPage(true);
    return;
  }

  return wordsService
    .updateUserWord({
      token: authorizationInfo.token,
      userId: authorizationInfo.userId,
      wordId: updatedWordInfo.wordId,
      wordPayload: createUserWord({ ...updatedWordInfo }),
      controller,
    })
    .then(() => dispatch(updateUserWord(updatedWordInfo)))
    .catch(e => {
      if (e.message === ERROR_MESSAGE_STATISTICS_SERVICE.INVALID_ACCESS_TOKEN) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
        return;
      }

      if (e.message === USER_ABORT_REQUEST) {
        return;
      }

      dispatch(addError(e.message));
    });
};

export const uploadUserWord = ({ setIsRedirectToLoginPage, controller, updatedWord }) => dispatch => {
  const { authorizationInfo } = store.getState();

  if (!authorizationInfo) {
    setIsRedirectToLoginPage(true);
    return;
  }

  wordsService
    .updateUserWord({
      token: authorizationInfo.token,
      userId: authorizationInfo.userId,
      wordId: updatedWord.wordId,
      wordPayload: updatedWord,
      controller,
    })
    .then(() => dispatch(updateUserWord(updatedWord)))
    .catch(e => {
      if (e.message === ERROR_MESSAGE_WORDS_SERVICE.INVALID_ACCESS_TOKEN) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
        return;
      }

      if (e.message === USER_ABORT_REQUEST) {
        return;
      }

      dispatch(addError(e.message));
    });
};

export const setAllStatistics = ({ statistics, dispatch }) => {
  dispatch(setDailyStatistics(statistics.dailyStatistics));
  dispatch(setCommonStatistics(statistics.commonStatistics));
  dispatch(setLongTermStatistics(statistics.longTermStatistics));
  dispatch(setSpeakItStatistics(statistics.speakItStatistics));
  dispatch(setSprintStatistics(statistics.sprintStatistics));
  dispatch(setSavannaStatistics(statistics.savannaStatistics));
  dispatch(setAudioChallengeStatistics(statistics.audioChallengeStatistics));
};

export const checkIsAllStatisticsLoaded = ({ statistics }) =>
  statistics &&
  statistics.commonStatistics &&
  statistics.dailyStatistics &&
  statistics.longTermStatistics &&
  statistics.speakItStatistics &&
  statistics.sprintStatistics &&
  statistics.savannaStatistics &&
  statistics.audioChallengeStatistics;
