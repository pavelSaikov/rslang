import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import student from '../../../assets/images/student.svg';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Button } from './components/Button/Button';
import { ROUTES } from './../../routing/routes';
import { useStyles } from './AuthorizationPage.styles';
import { setAuthorizationInfo } from './store/AuthorizationPage.actions';
import { authorizationService } from './../../services/AuthorizationService/AuthorizationService';
import { getUserData } from './store/AuthorizationPage.thunk';
import { authorizationInfoSelector } from './store/AuthorizationPage.selectors';
import { Loading } from '../common/components/Loading/Loading';

export const AuthorizationPage = () => {
  const [renderState, setRenderState] = useState(false);
  const [previousUserInput, setPreviousUserInput] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isShowLoadingPage, setIsShowLoadingPage] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const authorizationInfo = useSelector(authorizationInfoSelector);
  const abortControllerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (
      !isUserLogin &&
      authorizationInfo &&
      authorizationService.checkIsAuthorizationTokenValid({ creationDate: authorizationInfo.creationDate })
    ) {
      history.push({ pathname: ROUTES.LEARNING });
    } else {
      dispatch(setAuthorizationInfo(null));
      setRenderState(true);
    }
  }, [dispatch, history, authorizationInfo, isUserLogin]);

  const onSendClick = useCallback(
    (email, password) => {
      if (previousUserInput && previousUserInput.email === email && previousUserInput.password === password) {
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const from = location.state && location.state.from ? location.state.from : ROUTES.LEARNING;
      setIsShowLoadingPage(true);
      abortControllerRef.current = new AbortController();
      dispatch(
        getUserData({
          email,
          password,
          history,
          path: from,
          setIsUserLogin,
          controller: abortControllerRef.current,
          setIsShowLoadingPage,
        }),
      );
      setPreviousUserInput({ email, password });
    },
    [dispatch, history, previousUserInput, location],
  );

  if (isShowLoadingPage) {
    return <Loading />;
  }

  return (
    renderState && (
      <div className={classes.pageWrapper}>
        <div className={classes.wrapperFlexRow}>
          <h2>RSlang</h2>
          <Link to={ROUTES.REGISTRATION}>
            <Button text="Sign Up"></Button>
          </Link>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.textContainer}>
            <div className={classes.imageContainer}>
              <img src={student} width={'100%'} />
            </div>
            <div className={classes.headerContainer}>
              <h2>Рады видеть тебя снова!</h2>
            </div>
          </div>
          <div className={classes.formContainer}>
            <LoginForm onSendClick={onSendClick}></LoginForm>
          </div>
        </div>
      </div>
    )
  );
};
