import { setAuthorizationInfo } from './AuthorizationPage.actions';
import { localStorageIdentifiers } from '../../../store/middlewares';

const getAuthorizationInfoFromLocalStorage = () => {
  const authorizationInfo = JSON.parse(localStorage.getItem(localStorageIdentifiers.authorizationInfo));

  if (authorizationInfo && authorizationInfo.token && authorizationInfo.userId && authorizationInfo.creationDate) {
    return authorizationInfo;
  }

  return null;
};

const DEFAULT_AUTHORIZATION_INFO = getAuthorizationInfoFromLocalStorage();

export const authorizationInfoReducer = (state = DEFAULT_AUTHORIZATION_INFO, action) => {
  switch (action.type) {
    case setAuthorizationInfo.type:
      return action.payload || null;
    default:
      return state;
  }
};
