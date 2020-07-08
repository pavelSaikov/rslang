import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Score.style';

export const Score = ({ score }) => {
  const { scoreStyle } = useStyles();

  return <div className={scoreStyle}>{score}</div>;
};

Score.propTypes = {
  score: PropTypes.number.isRequired,
};
