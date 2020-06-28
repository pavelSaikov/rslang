import React, { useCallback, useState } from 'react';

import { Email } from './components/Email/Email';
import { Password } from './components/Password/Password';
import { Button } from './components/Button/Button';
import { LinkWithDescription } from './components/LinkWithDescription/LinkWithDescription';
import { useStyles } from './RegistrationForm.styles';

export const RegistrationForm = () => {
  const [emailState, setEmailState] = useState({ isValid: false, email: null });
  const [firstPasswordState, setFirstPasswordState] = useState({ isValid: false, password: null });
  const [secondPasswordState, setSecondPasswordState] = useState({ isValid: false, password: null });
  const classes = useStyles();

  const submit = useCallback(() => {
    if (
      emailState.isValid &&
      firstPasswordState.isValid &&
      secondPasswordState.isValid &&
      firstPasswordState.password === secondPasswordState.password
    ) {
      console.log('Ok');
    }
  }, [
    emailState.isValid,
    firstPasswordState.isValid,
    firstPasswordState.password,
    secondPasswordState.isValid,
    secondPasswordState.password,
  ]);

  return (
    <div className="login-page">
      <div className={classes.wrapperFlexRow}>
        <div className={classes.wrapperFlexColumn}>
          <div className={classes.wrapper}>
            <Email setEmailState={setEmailState} header="Sign Up" caption="Email or login"></Email>
            <Password setPasswordState={setFirstPasswordState} caption="Password"></Password>
            <Password setPasswordState={setSecondPasswordState} caption="Repeat Password"></Password>
            <Button text="Sign Up" submit={submit}></Button>
            <LinkWithDescription description="Already have an account? " linkCaption="Log In"></LinkWithDescription>
          </div>
        </div>
      </div>
    </div>
  );
};
