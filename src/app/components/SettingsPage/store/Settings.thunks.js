import { store } from '../../../store';

import { settingsService } from '../../../services/SettingsService/SettingsService';
import { setAuthorizationInfo } from '../../AuthorizationPage/store/AuthorizationPage.actions';
import { ERROR_MESSAGE_AUTHORIZATION_SERVICE } from '../../../services/AuthorizationService/AuthorizationService.models';

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
      if (ERROR_MESSAGE_AUTHORIZATION_SERVICE.INVALID_ACCESS_TOKEN === e.message) {
        dispatch(setAuthorizationInfo(null));
        setIsRedirectToLoginPage(true);
      }
    });
};
