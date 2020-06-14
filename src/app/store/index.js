import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const store = createStore(combineReducers({}), composeWithDevTools(applyMiddleware(thunkMiddleware)));
