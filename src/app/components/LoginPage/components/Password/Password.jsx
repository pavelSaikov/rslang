import React, { useRef, useCallback, useState } from 'react';
import { useStyles } from './Password.styles';

const Password = () => {
  const input = useRef(0);
  const classes = useStyles();
  const [isPasswordVisible, setPasswordVisibility] = useState('password');
  const [spellCheck, setSpellCheckState] = useState(false);
  const passwordValidation = useCallback(() => {
    // eslint-disable-line
    // eslint-disable-next-line no-useless-escape
    const regForPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$');
    const password = input.current.value;
    console.log(regForPassword.test(password));
  }, []);

  const mousePressed = useCallback(() => {
    setPasswordVisibility('text');
  }, []);

  const mouseReleased = useCallback(() => {
    setPasswordVisibility('password');
  }, []);

  const startSpellCheck = useCallback(() => {
    const password = input.current.value;
    if (password.length === 0) {
      console.log(password.length);
      setSpellCheckState(false);
    } else {
      setSpellCheckState(true);
      passwordValidation();
    }
  }, [passwordValidation]);

  return (
    <div>
      <label htmlFor="password">Password</label>
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

export default Password;
