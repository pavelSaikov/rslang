import React from 'react';
import PropTypes from 'prop-types';

import { ProgressPart } from './ProgressPart/ProgressPart';
import { useStyles } from './ProgressStrip.styles';

export const ProgressStrip = ({ partsNumber, currentProgress }) => {
  const classes = useStyles();

  return (
    <div className={classes.progressStrip}>
      <div className={classes.numericBorder}>0</div>
      {Array.from({ length: partsNumber }, (_, index) => index).map(index => (
        <ProgressPart key={index} myIndex={index} currentProgress={currentProgress} partsNumber={partsNumber} />
      ))}
      <div className={classes.numericBorder}>{partsNumber}</div>
    </div>
  );
};

ProgressStrip.propTypes = {
  partsNumber: PropTypes.number.isRequired,
  currentProgress: PropTypes.number.isRequired,
};
