import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Button.styles';

export const Button = ({ onClick, message, styleClasses }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.button} ${styleClasses}`} onClick={onClick}>
      {message}
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  styleClasses: PropTypes.string,
};
