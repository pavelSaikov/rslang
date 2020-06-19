import React, { useRef, useCallback, useState } from 'react';
import { useStyles } from './Email.styles';
import PropTypes from 'prop-types';

const Email = ({ callback, caption, header }) => {
  const input = useRef();
  const classes = useStyles();
  const [spellCheck, setSpellCheckState] = useState(false);
  const [validationError, setValidationState] = useState(false);

  const emailValidation = useCallback(() => {
    // eslint-disable-next-line no-useless-escape
    const regForMail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const email = input.current.value;
    if (regForMail.test(String(email).toLowerCase())) {
      setValidationState(true);
      callback({ isValid: validationError, email });
    } else {
      setValidationState(false);
      callback({ isValid: validationError, email: null });
    }
  }, [callback, validationError]);

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
      <div>{header}</div>
      <label htmlFor="email">{caption}</label>
      <div className={classes.inputWrapper}>
        <input
          ref={input}
          className={classes.input}
          name="email"
          type="caption"
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

Email.propTypes = {
  callback: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
