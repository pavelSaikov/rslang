import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Email } from '../../common/components/Email/Email';
import { Password } from '../../common/components/Password/Password';
import { Button } from '../../common/components/Button/Button';
import { LinkWithDescription } from '../../common/components/LinkWithDescription/LinkWithDescription';
import { useStyles } from './RegistrationForm.styles';
import { ROUTES } from '../../../routing/routes';
import { addError } from '../../errors/store/Errors.actions';

export const RegistrationForm = ({ onSignUpClick }) => {
  const [emailState, setEmailState] = useState({ isValid: false, email: null });
  const [firstPasswordState, setFirstPasswordState] = useState({ isValid: false, password: null });
  const [secondPasswordState, setSecondPasswordState] = useState({ isValid: false, password: null });
  const classes = useStyles();
  const dispatch = useDispatch();

  const submit = useCallback(() => {
    if (!emailState.isValid || !firstPasswordState.isValid || !secondPasswordState.isValid) {
      return;
    }

    if (firstPasswordState.password !== secondPasswordState.password) {
      dispatch(addError('Вы ввели разные пароли'));
      return;
    }

    onSignUpClick({ email: emailState.email, password: firstPasswordState.password });
  }, [emailState, firstPasswordState, secondPasswordState, onSignUpClick, dispatch]);

  useEffect(() => {
    const onInputClick = e => {
      const isIncorrectKeyboardPressing = e.key !== 'Enter' || e.repeat;

      if (isIncorrectKeyboardPressing) {
        return;
      }

      submit();
    };

    window.addEventListener('keydown', onInputClick);

    return () => window.removeEventListener('keydown', onInputClick);
  }, [submit]);

  return (
    <div className={classes.wrapper}>
      <Email setEmailState={setEmailState} header="Регистрация" caption="Электронная почта"></Email>
      <Password setPasswordState={setFirstPasswordState} caption="Пароль"></Password>
      <Password setPasswordState={setSecondPasswordState} caption="Повторите Пароль"></Password>
      <Button text="Зарегистрироваться" submit={submit}></Button>
      <LinkWithDescription
        description="Уже есть аккаунт?"
        linkCaption="Войти"
        path={ROUTES.LOGIN}
      ></LinkWithDescription>
    </div>
  );
};

RegistrationForm.propTypes = {
  onSignUpClick: PropTypes.func.isRequired,
};
