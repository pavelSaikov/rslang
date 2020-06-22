import React, { useRef, useCallback, useState } from 'react';
import { useStyles } from './Password.styles';
import PropTypes from 'prop-types';
import { PASSWORD_VALIDATION_PATTERN } from './PASSWORD_VALIDATION_PATTERN.models';

export const Password = ({ setPasswordState, caption }) => {
  const input = useRef(null);
  const classes = useStyles();
  const [isPasswordVisible, setPasswordVisibility] = useState('password');
  const [validationError, setValidationState] = useState(false);
  const [spellCheck, setSpellCheckState] = useState(false);

  const passwordValidation = useCallback(() => {
    const password = input.current.value;
    if (PASSWORD_VALIDATION_PATTERN.test(String(password).toLowerCase())) {
      setValidationState(true);
      setPasswordState(validationError);
    } else {
      setValidationState(false);
      setPasswordState(validationError);
    }
  }, [setPasswordState, validationError]);

  const mousePressed = useCallback(() => {
    setPasswordVisibility('text');
  }, []);

  const mouseReleased = useCallback(() => {
    setPasswordVisibility('password');
  }, []);

  const startSpellCheck = useCallback(() => {
    const password = input.current.value;
    if (password.length === 0) {
      setSpellCheckState(false);
    } else {
      setSpellCheckState(true);
      passwordValidation();
    }
  }, [passwordValidation]);

  return (
    <div>
      <label htmlFor="password" className={classes.caption}>
        {caption}
      </label>
      <div className={classes.inputWrapper}>
        <input
          ref={input}
          className={classes.input}
          name="password"
          type={isPasswordVisible}
          placeholder="password"
          onKeyUp={({ keyCode }) => {
            if (keyCode === 13) {
              passwordValidation();
            }
          }}
          onChange={startSpellCheck}
        />
      </div>
      {spellCheck ? (
        <div className={classes.mark}>
          <i className="ic-eye" onMouseDown={mousePressed} onMouseUp={mouseReleased}></i>
        </div>
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

Password.propTypes = { setPasswordState: PropTypes.func.isRequired, caption: PropTypes.string.isRequired };
