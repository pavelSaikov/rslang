import React, { useCallback } from 'react';
import Email from './components/Email/Email';
import Password from './components/Password/Password';
import LoginButton from './components/LoginButton/LoginButton';
import RegisterNew from './components/RegisterNew/RegisterNew';

export const LoginPage = () => {
  const onLoginClick = useCallback(() => {}, []);
  const refEmail = React.createRef();
  const refPassword = React.createRef();
  return (
    <div>
      <Email ref={refEmail}></Email>
      <Password ref={refPassword}></Password>
      <LoginButton text="" callback={onLoginClick}></LoginButton>
      <RegisterNew text="" path=""></RegisterNew>
    </div>
  );
};
