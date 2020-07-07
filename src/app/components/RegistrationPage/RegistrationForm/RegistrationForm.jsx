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
      dispatch(addError('You input different passwords.'));
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
  );
};

RegistrationForm.propTypes = {
  onSignUpClick: PropTypes.func.isRequired,
};
