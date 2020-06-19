import React, { useCallback, useState } from 'react';
import Email from './components/Email/Email';
import Password from './components/Password/Password';
import Button from './components/Button/Button';
import LinkWithDescription from './components/LinkWithDescription/LinkWithDescription';

const Form = () => {
  const [emailState, setEmailState] = useState({ isValid: false, email: null });
  const [passwordState, setPasswordState] = useState({ isValid: false, password: null });

  const validateEmail = useCallback(val => {
    setEmailState(val);
  }, []);

  const validatePassword = useCallback(val => {
    setPasswordState(val);
  }, []);

  const submit = useCallback(() => {
    if (emailState.isValid && passwordState.isValid) {
      console.log();
    }
  }, [emailState.isValid, passwordState.isValid]);

  return (
    <div>
      <Email callback={validateEmail}></Email>
      <Password callback={validatePassword}></Password>
      <Button text="LogIn" submit={submit}></Button>
      <LinkWithDescription text="Don`t you have an account" path="" third="Sign up"></LinkWithDescription>
    </div>
  );
};

export default Form;
