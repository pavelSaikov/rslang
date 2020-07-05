import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Email } from '../../common/components/Email/Email';
import { Password } from '../../common/components/Password/Password';
import { Button } from '../../common/components/Button/Button';
import { LinkWithDescription } from '../../common/components/LinkWithDescription/LinkWithDescription';
import { useStyles } from './RegistrationForm.styles';
import { ROUTES } from '../../../routing/routes';

export const RegistrationForm = ({ onSignUpClick }) => {
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
      onSignUpClick({ email: emailState.email, password: firstPasswordState.password });
    }
  }, [emailState, firstPasswordState, secondPasswordState, onSignUpClick]);

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

RegistrationForm.propTypes = {
  onSignUpClick: PropTypes.func.isRequired,
};
