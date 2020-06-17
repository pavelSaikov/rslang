/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { store } from '../store/index';
import { authorizationInfoSelector } from '../store/App.selectors';
import { ROUTES } from './routes';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const state = store.getState();
      const authorizationToken = authorizationInfoSelector(state);
      return authorizationToken ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: ROUTES.LOGIN, state: props.location }} />
      );
    }}
  />
);
