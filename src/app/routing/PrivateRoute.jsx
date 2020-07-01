import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { store } from '../store/index';
import { authorizationInfoSelector } from '../components/AuthorizationPage/store/AuthorizationPage.selectors';
import { ROUTES } from './routes';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() => {
      const state = store.getState();
      const authorizationInfo = authorizationInfoSelector(state);
      return authorizationInfo ? <Component /> : <Redirect to={{ pathname: ROUTES.LOGIN }} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
