import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { authorizationInfoReducer } from '../components/AuthorizationPage/store/AuthorizationPage.reducers';
import { settingsReducer } from '../components/SettingsPage/store/Settings.reducers';
import { userDictionaryReducer } from '../components/DictionaryPage/store/UserDictionary.reducers';
import { localStorageMiddleware } from './middlewares';
import { menuReducer } from '../components/Menu/store/Menu.reducers';
import { commonStatisticsReducer } from '../components/StatisticsPage/store/common-statistics/CommonStatistics.reducers';
import { dailyStatisticsReducer } from '../components/StatisticsPage/store/daily-statistics/DailyStatistics.reducers';
import { learningPageConfigReducer } from '../components/LearningPage/store/LearningPage.reducers';
import { errorsReducer } from '../components/errors/store/Errors.reducer';
import { gameDescriptionReducer } from '../components/GamesPage/components/common/GameDescription/store/GameDescription.reducer';
import { longTermStatisticsReducer } from '../components/StatisticsPage/store/long-term-statistics/LongTermStatistics.reducers';
import { speakItReducer } from '../components/GamesPage/components/SpeakIt/store/SpeakIt.reducer';
import { resetStore } from './App.actions';

const appReducer = combineReducers({
  authorizationInfo: authorizationInfoReducer,
  settings: settingsReducer,
  userDictionary: userDictionaryReducer,
  menuState: menuReducer,
  speakIt: speakItReducer,
  learningPageConfig: learningPageConfigReducer,
  statistics: combineReducers({
    commonStatistics: commonStatisticsReducer,
    dailyStatistics: dailyStatisticsReducer,
    longTermStatistics: longTermStatisticsReducer,
  }),
  errors: errorsReducer,
  gameDescription: gameDescriptionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === resetStore.type) {
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, localStorageMiddleware)),
);
