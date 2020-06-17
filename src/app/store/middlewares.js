import { setAuthorizationInfo } from './App.actions';

export const localStorageMiddleware = () => next => action => {
  if (action.type === setAuthorizationInfo.type) {
    localStorage.setItem(localStorageIdentifiers.authorizationInfo, JSON.stringify(action.payload));
  }

  return next(action);
};

export const localStorageIdentifiers = {
  gameOptions: 'gameOptions',
  authorizationInfo: 'authorizationInfo',
};
