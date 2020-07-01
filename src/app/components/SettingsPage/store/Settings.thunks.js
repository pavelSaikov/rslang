import { store } from '../../../store';

import { settingsService } from '../../../services/SettingsService/SettingsService';
import { setSettings } from './Settings.actions';
import { setAuthorizationInfo } from '../../AuthorizationPage/store/AuthorizationPage.actions';
import { ERROR_MESSAGES } from '../../../services/SettingsService/SettingsService.models';

export const initializeSettingsPage = ({ setIsPageInitialized, setIsRedirectToLoginPage, controller }) => dispatch => {
  const { authorizationInfo } = store.getState();

  settingsService
    .getUserSettings({ token: authorizationInfo.token, userId: authorizationInfo.userId, controller })
    .then(settings => {
      dispatch(setSettings(settings));
      setIsPageInitialized(true);
    })
    .catch(() => {
      dispatch(setAuthorizationInfo(null));
      setIsRedirectToLoginPage(true);
    });
};

export const updateSettings = ({ setIsRedirectToLoginPage, controller, settings }) => dispatch => {
  const { authorizationInfo } = store.getState();

  settingsService
    .setUserSettings({
      token: authorizationInfo.token,
      userId: authorizationInfo.userId,
      controller,
      settings,
    })
    .catch(e => {
      if (ERROR_MESSAGES.includes(e.message)) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
      }
    });
};
