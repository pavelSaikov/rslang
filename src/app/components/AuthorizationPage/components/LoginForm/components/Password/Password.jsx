import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Password.styles';
import { PASSWORD } from './PASSWORD.models';

export const Password = ({ setPasswordState, caption }) => {
  const input = useRef(null);
  const classes = useStyles();
  const [isPasswordVisible, setPasswordVisibility] = useState('password');
  const [spellCheck, setSpellCheckState] = useState(false);

  const validatePassword = useCallback(() => {
    const password = input.current.value;
    if (PASSWORD.test(password)) {
      setPasswordState({ isValid: true, password: password });
    } else {
      setPasswordState({ isValid: false, password: null });
    }
  }, [setPasswordState]);

  const mousePressed = useCallback(() => {
    setPasswordVisibility('text');
  }, []);

  const mouseReleased = useCallback(() => {
    setPasswordVisibility('password');
  }, []);

  const startSpellCheck = useCallback(() => {
    const password = input.current.value;
    if (!password.length) {
      setSpellCheckState(false);
    } else {
      setSpellCheckState(true);
      validatePassword();
    }
  }, [validatePassword]);

  const handleKeyPress = useCallback(
    ({ keyCode }) => {
      if (keyCode === 13) {
        validatePassword();
      }
    },
    [validatePassword],
  );

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
          onKeyUp={handleKeyPress}
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
