import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { authorizationInfoReducer } from './App.reducers';
import { settingsReducer } from '../components/SettingsPage/store/Settings.reducers';
import { userDictionaryReducer } from '../components/LearningPage/store/UserDictionary.reducers';
import { localStorageMiddleware } from './middlewares';
import { menuReducer } from '../components/Menu/store/Menu.reducers';

export const store = createStore(
  combineReducers({
    authorizationInfo: authorizationInfoReducer,
    settings: settingsReducer,
    userDictionary: userDictionaryReducer,
    menuState: menuReducer,
  }),
  composeWithDevTools(applyMiddleware(thunkMiddleware, localStorageMiddleware)),
);
