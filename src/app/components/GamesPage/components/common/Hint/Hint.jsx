import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Hint.styles';

export const Hint = ({ rules }) => {
  const classes = useStyles();
  return <div className={classes.container}>{rules}</div>;
};

Hint.propTypes = { rules: PropTypes.string.isRequired };
