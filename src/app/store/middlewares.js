import { setAuthorizationInfo } from '../components/AuthorizationPage/store/AuthorizationPage.actions';
import { resetStore } from './App.actions';

export const localStorageMiddleware = () => next => action => {
  if (action.type === setAuthorizationInfo.type) {
    localStorage.setItem(localStorageIdentifiers.authorizationInfo, JSON.stringify(action.payload));
  }
  if (action.type === resetStore.type) {
    localStorage.setItem(localStorageIdentifiers.authorizationInfo, null);
  }
  return next(action);
};

export const localStorageIdentifiers = {
  gameOptions: 'gameOptions',
  authorizationInfo: 'authorizationInfo',
};
