import React, { useCallback, useState } from 'react';
import Email from './components/Email/Email';
import Password from './components/Password/Password';
import LoginButton from './components/LoginButton/LoginButton';
import RegisterNew from './components/RegisterNew/RegisterNew';

export const LoginPage = () => {
  const [isEmailOk, setEmailCheckState] = useState(false);
  const [isPasswordOk, setPasswordCheckState] = useState(false);
  const [isItBeenSubmitted, setSubmissionState] = useState(false);
  const validateEmail = useCallback(
    val => {
      console.log(val);
      setEmailCheckState(val);
      if (isEmailOk) {
        setEmailCheckState(val);
        console.log('email is ok');
      }
    },
    [isEmailOk],
  );

  const validatePassword = useCallback(
    val => {
      console.log(val);
      setPasswordCheckState(val);
      if (isPasswordOk) {
        setPasswordCheckState(val);
        console.log('Password is ok');
      }
    },
    [isPasswordOk],
  );

  const submit = useCallback(
    val => {
      console.log(val);
      setSubmissionState(val);
      if (isItBeenSubmitted) {
        setSubmissionState(val);
        console.log('Button has been pressed');
      }
    },
    [isItBeenSubmitted],
  );

  if (isEmailOk && isPasswordOk && isItBeenSubmitted) {
    console.log('Alles ist gut');
  }

  return (
    <div>
      <Email callback={validateEmail}></Email>
      <Password callback={validatePassword}></Password>
      <LoginButton text="" callback={submit}></LoginButton>
      <RegisterNew text="" path=""></RegisterNew>
    </div>
  );
};
