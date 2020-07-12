import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Symbol.styles';

export const Symbol = ({ isItAnswered, onMegaphoneClick }) => {
  const classes = useStyles();

  const chooseSymbol = useMemo(() => {
    if (isItAnswered) {
      return <i className={`icon-check ${classes.answered}`}></i>;
    }

    return <i className="icon-bullhorn"></i>;
  }, [classes.answered, isItAnswered]);

  return (
    <div className={classes.mark} onClick={onMegaphoneClick}>
      {chooseSymbol}
    </div>
  );
};

Symbol.propTypes = {
  isItAnswered: PropTypes.bool.isRequired,
  onMegaphoneClick: PropTypes.func.isRequired,
};
