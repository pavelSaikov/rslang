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
import { useStyles } from './App.styles';
import { RegistrationPage } from './components/RegistrationPage/RegistrationPage';
import { Errors } from './components/errors/Errors';

export const App = () => {
  const { wrapper } = useStyles();
  return (
    <div className={wrapper}>
      <Errors />
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={AuthorizationPage}></Route>
          <Route exact path={ROUTES.REGISTRATION} component={RegistrationPage}></Route>
          <PrivateRoute exact path={ROUTES.MAIN} component={MainPage}></PrivateRoute>
          <PrivateRoute exact path={ROUTES.DICTIONARY} component={DictionaryPage}></PrivateRoute>
          <PrivateRoute path={ROUTES.GAMES} component={Games}></PrivateRoute>
          <PrivateRoute exact path={ROUTES.LEARNING} component={LearningPage}></PrivateRoute>
          <PrivateRoute exact path={ROUTES.STATISTIC} component={StatisticsPage}></PrivateRoute>
          <PrivateRoute exact path={ROUTES.TEAM} component={TeamPage}></PrivateRoute>
          <PrivateRoute exact path={ROUTES.SETTINGS} component={SettingsPage}></PrivateRoute>
          <Route exact path={'/'}>
            <Redirect to={ROUTES.MAIN} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
