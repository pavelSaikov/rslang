import React, { useCallback, useEffect, useRef, useState } from 'react';

import { RegistrationForm } from './RegistrationForm/RegistrationForm';
import { useDispatch } from 'react-redux';
import { registerUser } from './store/RegistrationPage.thunks';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../routing/routes';

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [previousUserCred, setPreviousUserCredo] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(
    () => () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    },
    [],
  );

  const onSignUpClick = useCallback(
    ({ email, password }) => {
      if (previousUserCred && previousUserCred.email === email && previousUserCred.password === password) {
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setPreviousUserCredo({ email, password });
      dispatch(registerUser({ email, password, controller: abortControllerRef.current, setIsUserRegistered }));
    },
    [previousUserCred, dispatch],
  );

  if (isUserRegistered) {
    return <Redirect to={ROUTES.MAIN} />;
  }

  return (
    <div>
      <h2>RegistrationPage</h2>
      <RegistrationForm onSignUpClick={onSignUpClick} />
    </div>
  );
};
