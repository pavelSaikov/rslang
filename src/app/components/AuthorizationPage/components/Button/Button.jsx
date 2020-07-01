import React from 'react';
import { useStyles } from './Button.styles';
import PropTypes from 'prop-types';

export const Button = ({ text }) => {
  const classes = useStyles();

  return <button className={classes.btn}>{text}</button>;
};

Button.propTypes = { text: PropTypes.string.isRequired };
