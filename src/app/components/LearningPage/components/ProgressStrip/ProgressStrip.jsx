import React from 'react';
import PropTypes from 'prop-types';

import { ProgressPart } from './ProgressPart/ProgressPart';
import { useStyles } from './ProgressStrip.styles';

export const ProgressStrip = ({ partsNumber, currentProgress, progressType, supremum }) => {
  const classes = useStyles({ progressType });

  return (
    <div className={classes.progressStrip}>
      <div className={classes.numericBorder}>0</div>
      <div className={classes.progressParts}>
        {Array.from({ length: partsNumber }, (_, index) => index).map(index => (
          <ProgressPart
            key={index}
            myIndex={index}
            currentProgress={currentProgress}
            partsNumber={partsNumber}
            progressType={progressType}
          />
        ))}
      </div>
      <div className={classes.numericBorder}>{supremum}</div>
    </div>
  );
};

ProgressStrip.propTypes = {
  partsNumber: PropTypes.number.isRequired,
  currentProgress: PropTypes.number.isRequired,
  progressType: PropTypes.string,
  supremum: PropTypes.number.isRequired,
};
