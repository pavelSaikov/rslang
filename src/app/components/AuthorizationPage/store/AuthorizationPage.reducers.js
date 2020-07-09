import { setAuthorizationInfo } from './AuthorizationPage.actions';
import { localStorageIdentifiers } from '../../../store/middlewares';
import { resetStore } from '../../../store/App.actions';

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
      return action.payload;
    case resetStore.type:
      return null;
    default:
      return state;
  }
};
