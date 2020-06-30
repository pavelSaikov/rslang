import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './ProgressPart.styles';

export const ProgressPart = ({ myIndex, currentProgress, partsNumber }) => {
  const classes = useStyles();
  const partClasses = useMemo(() => {
    let styleClasses = `${classes.progressPart}`;
    styleClasses = myIndex === 0 ? styleClasses.concat(' first') : styleClasses;
    styleClasses = myIndex === partsNumber - 1 ? styleClasses.concat(' last') : styleClasses;
    styleClasses = myIndex > currentProgress ? styleClasses : styleClasses.concat(' filled');

    return styleClasses;
  }, [myIndex, currentProgress, partsNumber, classes]);

  return <div className={partClasses}></div>;
};

ProgressPart.propTypes = {
  myIndex: PropTypes.number.isRequired,
  currentProgress: PropTypes.number.isRequired,
  partsNumber: PropTypes.number.isRequired,
};
