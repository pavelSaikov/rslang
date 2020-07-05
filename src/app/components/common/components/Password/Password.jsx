import React, { useRef, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Password.styles';
import { PASSWORD } from './PASSWORD.models';

export const Password = ({ setPasswordState, caption }) => {
  const input = useRef(null);
  const classes = useStyles();
  const [isPasswordVisible, setPasswordVisibility] = useState('password');
  const [spellCheck, setSpellCheckState] = useState(false);
  const [validationError, setValidationState] = useState(false);

  const validatePassword = useCallback(() => {
    const password = input.current.value;
    if (PASSWORD.test(password)) {
      setPasswordState({ isValid: true, password: password });
      setValidationState(true);
    } else {
      setPasswordState({ isValid: false, password: null });
      setValidationState(false);
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

  const renderPasswordCaption = useMemo(() => {
    return (
      <div>
        {!spellCheck ? (
          <label htmlFor="password" className={classes.caption}>
            {caption}
          </label>
        ) : spellCheck && !validationError ? (
          <label htmlFor="password" className={classes.captionWrong}>
            {caption}
          </label>
        ) : (
          <label htmlFor="password" className={classes.captionCorrect}>
            {caption}
          </label>
        )}
      </div>
    );
  }, [caption, classes.caption, classes.captionCorrect, classes.captionWrong, spellCheck, validationError]);

  const renderVisibilityToggle = useMemo(() => {
    return (
      <div>
        {spellCheck ? (
          <div className={classes.mark}>
            <i className="icon-eye" onMouseDown={mousePressed} onMouseUp={mouseReleased}></i>
          </div>
        ) : (
          <div className={classes.mark}>
            <div className={classes.hidden}>
              <i className="icon-x-circle"></i>
            </div>
          </div>
        )}
      </div>
    );
  }, [classes.hidden, classes.mark, mousePressed, mouseReleased, spellCheck]);

  return (
    <div>
      {renderPasswordCaption}
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
      {renderVisibilityToggle}
    </div>
  );
};

Password.propTypes = { setPasswordState: PropTypes.func.isRequired, caption: PropTypes.string.isRequired };
