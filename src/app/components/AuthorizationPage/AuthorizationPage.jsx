import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginForm } from './components/LoginForm/LoginForm';
import { Button } from './components/Button/Button';
import { ROUTES } from './../../routing/routes';
import { useStyles } from './AuthorizationPage.styles';
import Background from './../../../assets/images/auth_woman.png';
import { setAuthorizationInfo } from './store/AuthorizationPage.actions';
import { authorizationService } from './../../services/AuthorizationService/AuthorizationService';
import { getUserData } from './store/AuthorizationPage.thunk';
import { authorizationInfoSelector } from './store/AuthorizationPage.selectors';

export const AuthorizationPage = () => {
  const [renderState, setRenderState] = useState(false);
  const [previousUserInput, setPreviousUserInput] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const authorizationInfo = useSelector(authorizationInfoSelector);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (
      authorizationInfo &&
      authorizationService.checkIsAuthorizationTokenValid({ creationDate: authorizationInfo.creationDate })
    ) {
      history.push({ pathname: ROUTES.MAIN });
    } else {
      dispatch(setAuthorizationInfo(null));
      setRenderState(true);
    }
  }, [dispatch, history, authorizationInfo]);

  const onSendClick = useCallback(
    (email, password) => {
      if (previousUserInput && previousUserInput.email === email && previousUserInput.password === password) {
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      dispatch(getUserData(email, password, history, ROUTES.MAIN, abortControllerRef.current));
      setPreviousUserInput({ email, password });
    },
    [dispatch, history, previousUserInput],
  );

  return (
    <div>
      {renderState && (
        <div className={classes.container}>
          <div className={classes.wrapperFlexRow}>
            <h2>RSlang</h2>
            <Link to={ROUTES.REGISTRATION}>
              <Button text="Sign Up"></Button>
            </Link>
          </div>
          <div className={classes.formContainer}>
            <LoginForm onSendClick={onSendClick}></LoginForm>
          </div>
          <img src={Background} className={classes.background} />
        </div>
      )}
    </div>
  );
};
