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

export const resetDailyStatistics = ({ setIsRedirectToLoginPage, setIsStatisticsPrepared, controller }) => dispatch => {
  const { authorizationInfo, statistics } = store.getState();

  if (!authorizationInfo) {
    setIsRedirectToLoginPage(true);
    return;
  }

  const updatedStatistics = {
    commonStatistics: createCommonStatistics({ ...statistics.commonStatistics }),
    dailyStatistics: createDailyStatistics({}),
  };

  return statisticsService
    .updateStatistics({
      token: authorizationInfo.token,
      userId: authorizationInfo.userId,
      statistics: updatedStatistics,
      controller,
    })
    .then(() => {
      dispatch(setDailyStatistics(updatedStatistics.dailyStatistics));
      dispatch(setCommonStatistics(updatedStatistics.commonStatistics));
      setIsStatisticsPrepared(true);
    })
    .catch(e => {
      if (e.message === ERROR_MESSAGE_STATISTICS_SERVICE.INVALID_ACCESS_TOKEN) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
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
        return resetDailyStatistics({ setIsRedirectToLoginPage, setIsStatisticsPrepared, controller });
      }

      dispatch(setDailyStatistics(statistics.dailyStatistics));
      dispatch(setCommonStatistics(statistics.commonStatistics));
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
  const {
    authorizationInfo,
    statistics: { commonStatistics, dailyStatistics },
  } = store.getState();

  if (!authorizationInfo) {
    setIsRedirectToLoginPage(true);
    return;
  }

  if (statisticsService.isStatisticsResetNeeded({ commonStatistics })) {
    return dispatch(resetDailyStatistics({ setIsRedirectToLoginPage, setIsStatisticsPrepared: () => {}, controller }));
  }

  const updatedStatistics = {
    dailyStatistics,
    commonStatistics: createCommonStatistics({ ...commonStatistics }),
  };

  return statisticsService
    .updateStatistics({
      token: authorizationInfo.token,
      userId: authorizationInfo.userId,
      statistics: updatedStatistics,
      controller,
    })
    .then(() => {
      dispatch(setDailyStatistics(dailyStatistics));
      dispatch(setCommonStatistics(commonStatistics));
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
