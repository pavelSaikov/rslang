import React, { useCallback } from 'react';
import { useStyles } from './LoginButton.styles';

const LoginButton = props => {
  const classes = useStyles();
  const handleClick = useCallback(() => {
    // eslint-disable-next-line react/prop-types
    props.callback(true);
  }, [props]);

  return (
    <div>
      <button className={classes.btn} onClick={handleClick}>
        Log In
      </button>
      <div className={classes.mark}>
        <i className="iс-forward"></i>
      </div>
    </div>
  );
};

export default LoginButton;
