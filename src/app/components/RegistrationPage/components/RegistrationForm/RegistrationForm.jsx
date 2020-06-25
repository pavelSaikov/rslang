import React, { useCallback, useState } from 'react';

import { Email } from '../../../common/Email/Email';
import { Password } from '../../../common/Password/Password';
import { Button } from '../../../common/Button/Button';
import { LinkWithDescription } from '../../../common/LinkWithDescription/LinkWithDescription';
import { useStyles } from './RegistrationForm.styles';
import { ROUTES } from '../../../../routing/routes';

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
      return;
    }
  }, [
    emailState.isValid,
    firstPasswordState.isValid,
    firstPasswordState.password,
    secondPasswordState.isValid,
    secondPasswordState.password,
  ]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapperFlexRow}>
        <div className={classes.wrapperFlexColumn}>
          <div className={classes.wrapper}>
            <Email setEmailState={setEmailState} header="Sign Up" caption="Email or login"></Email>
            <Password setPasswordState={setFirstPasswordState} caption="Password"></Password>
            <Password setPasswordState={setSecondPasswordState} caption="Repeat Password"></Password>
            <Button text="Sign Up" submit={submit}></Button>
            <LinkWithDescription
              description="Already have an account? "
              linkCaption="Log In"
              path={ROUTES.LOGIN}
            ></LinkWithDescription>
          </div>
        </div>
      </div>
    </div>
  );
};
