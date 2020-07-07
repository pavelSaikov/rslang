import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Button.styles';

export const Button = ({ text, onClickFunc }) => {
  const classes = useStyles();

  return (
    <button className={classes.btn} onClick={onClickFunc}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClickFunc: PropTypes.func.isRequired,
};
