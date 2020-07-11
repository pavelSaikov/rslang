import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Background.styles';

export const Background = ({ right }) => {
  const classes = useStyles();

  const changeBackground = useMemo(() => {
    switch (right) {
      case 2 || 3:
        return <div className={classes.twentyPercent}></div>;
      case 4 || 5:
        return <div className={classes.fortyPercent}></div>;
      case 6 || 7:
        return <div className={classes.sixtyPercent}></div>;
      case 8 || 9:
        return <div className={classes.eightyPercent}></div>;
      case 10:
        return <div className={classes.hundredPercent}></div>;
      default:
        return;
    }
  }, [classes, right]);

  return <div className={classes.container}>{changeBackground}</div>;
};

Background.propTypes = {
  right: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
};
