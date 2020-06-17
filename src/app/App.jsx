import React from 'react';
import { Switch, BrowserRouter, Link, Route, Redirect } from 'react-router-dom';

import { ROUTES } from './routing/routes';
import { PrivateRoute } from './routing/PrivateRoute';
import { MainPage } from './components/MainPage/MainPage';
import { Games } from './components/GamesPage/Games';
import { LearningPage } from './components/LearningPage/LearningPage';
import { LoginPage } from './components/LoginPage/LoginPage';
import { SettingsPage } from './components/SettingsPage/SettingsPage';
import { DictionaryPage } from './components/DictionaryPage/DictionaryPage';

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Link to={ROUTES.MAIN}>Main</Link>
          <div>
            <Link to={ROUTES.GAMES}>Games</Link>
          </div>
          <div>
            <Link to={ROUTES.LEARNING}>Learning</Link>
          </div>
          <div>
            <Link to={ROUTES.DICTIONARY}>Dictionary</Link>
          </div>
          <div>
            <Link to={ROUTES.SETTINGS}>Settings</Link>
          </div>
        </div>
      </div>
      <Switch>
        <PrivateRoute exact path={ROUTES.LOGIN}>
          <LoginPage />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.MAIN}>
          <MainPage />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.DICTIONARY}>
          <DictionaryPage />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.GAMES}>
          <Games />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.LEARNING}>
          <LearningPage />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.SETTINGS}>
          <SettingsPage />
        </PrivateRoute>
        <Route exact path={'/'}>
          <Redirect to={ROUTES.MAIN} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
