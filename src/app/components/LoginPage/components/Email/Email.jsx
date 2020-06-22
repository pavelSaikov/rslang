import React, { useRef, useCallback, useState } from 'react';
import { useStyles } from './Email.styles';
import PropTypes from 'prop-types';
import { EMAIL_VALIDATION_PATTERN } from './Email.models';

export const Email = ({ setEmailState, caption, header }) => {
  const input = useRef();
  const classes = useStyles();
  const [spellCheck, setSpellCheckState] = useState(false);
  const [validationError, setValidationState] = useState(false);

  const validateEmail = useCallback(() => {
    const email = input.current.value;
    if (EMAIL_VALIDATION_PATTERN.test(String(email).toLowerCase())) {
      setValidationState(true);
      setEmailState({ isValid: validationError, email });
    } else {
      setValidationState(false);
      setEmailState({ isValid: validationError, email: null });
    }
  }, [setEmailState, validationError]);

  const startSpellCheck = useCallback(() => {
    const email = input.current.value;
    if (email.length === 0) {
      setSpellCheckState(false);
    } else {
      setSpellCheckState(true);
      validateEmail();
    }
  }, [validateEmail]);

  return (
    <div>
      <div className={classes.header}>{header}</div>
      <label htmlFor="email" className={classes.caption}>
        {caption}
      </label>
      <div className={classes.inputWrapper}>
        <input
          ref={input}
          className={classes.input}
          name="email"
          type="caption"
          placeholder="email"
          onKeyUp={({ keyCode }) => {
            if (keyCode === 13) {
              validateEmail();
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

Email.propTypes = {
  setEmailState: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
