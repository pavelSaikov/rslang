import React, { useCallback, useState } from 'react';
import { Email } from './components/Email/Email';
import { Password } from './components/Password/Password';
import { Button } from './components/Button/Button';
import { LinkWithDescription } from './components/LinkWithDescription/LinkWithDescription';
import { useStyles } from './LoginPage.styles';

export const LoginPage = () => {
  const [emailState, setEmailState] = useState({ isValid: false, email: null });
  const [passwordState, setPasswordState] = useState({ isValid: false, password: null });
  const classes = useStyles();

  const submit = useCallback(() => {
    if (emailState.isValid && passwordState.isValid) {
      console.log();
    }
  }, [emailState.isValid, passwordState.isValid]);

  return (
    <div className={classes.wrapperFlexRow}>
      <div className={classes.wrapperFlexColumn}>
        <div className={classes.wrapper}>
          <Email setEmailState={setEmailState} header="Log In" caption="Email or login"></Email>
          <Password setPasswordState={setPasswordState} caption="Password"></Password>
          <Button text="Log In" submit={submit}></Button>
          <LinkWithDescription description="Don't have an account?" path="" linkCaption="Sign up"></LinkWithDescription>
        </div>
      </div>
    </div>
  );
};
