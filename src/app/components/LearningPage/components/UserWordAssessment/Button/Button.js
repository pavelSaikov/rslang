import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Button.styles';

export const Button = ({ onClick, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.button} onClick={onClick}>
      {message}
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
