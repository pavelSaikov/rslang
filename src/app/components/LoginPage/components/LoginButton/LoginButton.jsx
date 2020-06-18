import React from 'react';
import { useStyles } from './LoginButton.styles';

const LoginButton = props => {
  const classes = useStyles();

  return (
    <div>
      <button className={classes.btn} onClick={props}>
        Log In
      </button>
      <div className={classes.mark}>
        <i className="iс-forward"></i>
      </div>
    </div>
  );
};

export default LoginButton;
