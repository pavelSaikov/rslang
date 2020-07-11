import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Email } from '../../../common/components/Email/Email';
import { Password } from '../../../common/components/Password/Password';
import { Button } from '../../../common/components/Button/Button';
import { LinkWithDescription } from '../../../common/components/LinkWithDescription/LinkWithDescription';
import { useStyles } from './LoginForm.styles';
import { ROUTES } from '../../../../routing/routes';

export const LoginForm = ({ onSendClick }) => {
  const [emailState, setEmailState] = useState({ isValid: false, email: null });
  const [passwordState, setPasswordState] = useState({ isValid: false, password: null });
  const classes = useStyles();

  const submit = useCallback(() => {
    if (emailState.isValid && passwordState.isValid) {
      onSendClick(emailState.email, passwordState.password);
    }
  }, [emailState, passwordState, onSendClick]);

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
    <div className="login-page">
      <div className={classes.wrapper}>
        <Email setEmailState={setEmailState} header="Авторизация" caption="Электронная почта"></Email>
        <Password setPasswordState={setPasswordState} caption="Пароль"></Password>
        <Button text="Войти" submit={submit}></Button>
        <LinkWithDescription
          description="Отсутствует аккаунт?"
          linkCaption="Зарегистрироваться"
          path={ROUTES.REGISTRATION}
        ></LinkWithDescription>
      </div>
    </div>
  );
};

LoginForm.propTypes = { onSendClick: PropTypes.func.isRequired };
