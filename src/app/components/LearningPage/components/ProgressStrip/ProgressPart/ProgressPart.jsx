import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './ProgressPart.styles';

export const ProgressPart = ({ myIndex, currentProgress, partsNumber, progressType }) => {
  const classes = useStyles({ progressType });
  const partClasses = useMemo(() => {
    let style = `${classes.progressPart}`;
    style = myIndex === 0 ? style.concat(' first') : style;
    style = myIndex === partsNumber - 1 ? style.concat(' last') : style;
    style = myIndex > currentProgress ? style : style.concat(' filled');

    return style;
  }, [myIndex, currentProgress, partsNumber, classes]);

  return <div className={partClasses}></div>;
};

ProgressPart.propTypes = {
  myIndex: PropTypes.number.isRequired,
  currentProgress: PropTypes.number.isRequired,
  partsNumber: PropTypes.number.isRequired,
  progressType: PropTypes.string,
};
