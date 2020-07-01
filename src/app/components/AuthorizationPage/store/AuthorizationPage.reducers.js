import { setAuthorizationInfo } from './AuthorizationPage.actions';
import { localStorageIdentifiers } from '../../../store/middlewares';

const DEFAULT_AUTHORIZATION_INFO = JSON.parse(localStorage.getItem(localStorageIdentifiers.authorizationInfo)) || null;

export const authorizationInfoReducer = (state = DEFAULT_AUTHORIZATION_INFO, action) => {
  switch (action.type) {
    case setAuthorizationInfo.type:
      return action.payload || null;
    default:
      return state;
  }
};
