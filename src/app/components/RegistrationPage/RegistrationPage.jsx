import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import onlineLearning from '../../../assets/images/online-learning.svg';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';
import { registerUser } from './store/RegistrationPage.thunks';
import { ROUTES } from '../../routing/routes';
import { useStyles } from './RegistrationPage.styles';
import { Button } from '../AuthorizationPage/components/Button/Button';
import { Loading } from '../common/components/Loading/Loading';

export const RegistrationPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [previousUserCred, setPreviousUserCredo] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isShowLoadingPage, setIsShowLoadingPage] = useState(false);
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
      setIsShowLoadingPage(true);
      dispatch(
        registerUser({
          email,
          password,
          controller: abortControllerRef.current,
          setIsUserRegistered,
          setIsShowLoadingPage,
        }),
      );
    },
    [previousUserCred, dispatch],
  );

  if (isUserRegistered) {
    return <Redirect to={ROUTES.LEARNING} />;
  }

  if (isShowLoadingPage) {
    return <Loading />;
  }

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.header}>
        <h2>RSlang</h2>
        <Link to={ROUTES.LOGIN}>
          <Button text="Login"></Button>
        </Link>
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.descriptionContainer}>
          <div className={classes.imageContainer}>
            <img src={onlineLearning} width={'100%'} />
          </div>
          <div className={classes.description}>
            <div className={classes.headerContainer}>
              <h2>Изучай Английский язык вместе с нами!</h2>
            </div>
            <div className={classes.listHeader}>
              <p>Здесь тебя ждёт:</p>
            </div>
            <ul>
              <li>Интерактивный процесс обучения с методикой интервального повторения</li>
              <li>Множество игр, которые помогут сделать процесс обучения ещё более увлекательным</li>
              <li>Подробная статистика, с которой можно отслеживать свои успехи</li>
              <li>Множество настроек, которые позволят адаптировать процесс обучения под себя</li>
            </ul>
            <div className={classes.headerContainer}>
              <h2>Присоединяйся и стань гуру английского языка!</h2>
            </div>
          </div>
        </div>
        <div className={classes.registrationFormContainer}>
          <RegistrationForm onSignUpClick={onSignUpClick} />
        </div>
      </div>
    </div>
  );
};
