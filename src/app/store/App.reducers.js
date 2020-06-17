import { setAuthorizationInfo } from './App.actions';
import { localStorageIdentifiers } from './middlewares';

const DEFAULT_AUTHORIZATION_INFO = JSON.parse(localStorage.getItem(localStorageIdentifiers.authorizationInfo)) || {
  token: 'token',
  userId: 'userId',
};

export const authorizationInfoReducer = (state = DEFAULT_AUTHORIZATION_INFO, action) => {
  switch (action.type) {
    case setAuthorizationInfo.type:
      return action.payload || null;
    default:
      return state;
  }
};
