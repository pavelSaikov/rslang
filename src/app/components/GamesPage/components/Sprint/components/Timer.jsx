import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useStyles } from '../Sprint.styles';

export const Timer = ({ onTimerEnd, time }) => {
  const [currentTime, setTime] = useState(time);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!currentTime) {
        onTimerEnd();
      }
      setTime(currentTime - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [currentTime, onTimerEnd]);

  const { timerWrapper } = useStyles();

  return <div className={timerWrapper}>{currentTime}</div>;
};

Timer.propTypes = {
  onTimerEnd: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};
