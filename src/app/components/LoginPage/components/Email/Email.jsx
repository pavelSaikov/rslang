import React, { useRef, useCallback, useState } from 'react';
import { useStyles } from './Email.styles';

const Email = props => {
  const input = useRef();
  const classes = useStyles();
  const [spellCheck, setSpellCheckState] = useState(false);
  const [validationError, setValidationState] = useState(false);

  const emailValidation = useCallback(() => {
    // eslint-disable-line
    // eslint-disable-next-line no-useless-escape
    const regForMail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const email = input.current.value;
    if (regForMail.test(String(email).toLowerCase())) {
      setValidationState(true);
      // eslint-disable-next-line react/prop-types
      props.callback(validationError);
    } else {
      setValidationState(false);
      // eslint-disable-next-line react/prop-types
      props.callback(validationError);
    }
  }, [props, validationError]);

  const startSpellCheck = useCallback(() => {
    const email = input.current.value;
    if (email.length === 0) {
      setSpellCheckState(false);
    } else {
      setSpellCheckState(true);
      emailValidation();
    }
  }, [emailValidation]);

  return (
    <div>
      <div>Log In</div>
      <label htmlFor="email">Email address</label>
      <div className={classes.inputWrapper}>
        <input
          ref={input}
          className={classes.input}
          // eslint-disable-next-line react/prop-types
          name="email"
          type="text"
          placeholder="email"
          onKeyUp={({ keyCode }) => {
            if (keyCode === 13) {
              emailValidation();
            }
          }}
          onChange={startSpellCheck}
        />
      </div>
      {spellCheck ? (
        validationError ? (
          <div className={classes.mark}>
            <i className="ic-check"></i>
          </div>
        ) : (
          <div className={classes.mark}>
            <i className="ic-x"></i>
          </div>
        )
      ) : (
        <div className={classes.mark}>
          <div className={classes.hidden}>
            <i className="ic-x"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Email;
Email.displayName = 'Email';
