import React, { useCallback, useState } from 'react';
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

  return (
    <div className="login-page">
      <div className={classes.wrapperFlexRow}>
        <div className={classes.wrapperFlexColumn}>
          <div className={classes.wrapper}>
            <Email setEmailState={setEmailState} header="Log In" caption="Email or login"></Email>
            <Password setPasswordState={setPasswordState} caption="Password"></Password>
            <Button text="Log In" submit={submit}></Button>
            <LinkWithDescription
              description="Don't have an account? "
              linkCaption="Sign Up"
              path={ROUTES.REGISTRATION}
            ></LinkWithDescription>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = { onSendClick: PropTypes.func.isRequired };
