import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ROUTES } from './routing/routes';
import { PrivateRoute } from './routing/PrivateRoute';
import { MainPage } from './components/MainPage/MainPage';
import { Games } from './components/GamesPage/Games';
import { LearningPage } from './components/LearningPage/LearningPage';
import { AuthorizationPage } from './components/AuthorizationPage/AuthorizationPage';
import { SettingsPage } from './components/SettingsPage/SettingsPage';
import { StatisticsPage } from './components/StatisticsPage/StatisticsPage';
import { DictionaryPage } from './components/DictionaryPage/DictionaryPage';
import { TeamPage } from './components/TeamPage/TeamPage';
import { Menu } from './components/Menu/Menu';
import { useStyles } from './App.styles';
import { RegistrationPage } from './components/RegistrationPage/RegistrationPage';

export const App = () => {
  const { wrapper } = useStyles();
  return (
    <div className={wrapper}>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route exact path={ROUTES.REGISTRATION}>
            <RegistrationPage />
          </Route>
          <Route exact path={ROUTES.LOGIN}>
            <AuthorizationPage />
          </Route>
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
          <PrivateRoute exact path={ROUTES.STATISTIC}>
            <StatisticsPage />
          </PrivateRoute>
          <PrivateRoute exact path={ROUTES.TEAM}>
            <TeamPage />
          </PrivateRoute>
          <PrivateRoute exact path={ROUTES.SETTINGS}>
            <SettingsPage />
          </PrivateRoute>
          <Route exact path={'/'}>
            <Redirect to={ROUTES.MAIN} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
