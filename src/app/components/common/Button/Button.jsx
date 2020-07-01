import React from 'react';
import { useStyles } from './Button.styles';
import PropTypes from 'prop-types';

export const Button = ({ submit, text }) => {
  const classes = useStyles();

  return (
    <div>
      <button className={classes.btn} onClick={submit}>
        {text}
      </button>
      <div className={classes.mark}>
        <i className={`icon-log-in ${classes.iconForward}`}></i>
      </div>
    </div>
  );
};

Button.propTypes = { submit: PropTypes.func.isRequired, text: PropTypes.string.isRequired };
