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

export const store = createStore(
  combineReducers({
    authorizationInfo: authorizationInfoReducer,
    settings: settingsReducer,
    userDictionary: userDictionaryReducer,
    menuState: menuReducer,
    learningPageConfig: learningPageConfigReducer,
    statistics: combineReducers({ commonStatistics: commonStatisticsReducer, dailyStatistics: dailyStatisticsReducer }),
    errors: errorsReducer,
  }),
  composeWithDevTools(applyMiddleware(thunkMiddleware, localStorageMiddleware)),
);
