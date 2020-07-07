import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useStyles } from './Star.styles';
import { activeWordSelector } from '../../store/SpeakIt.selector';

export const Star = () => {
  const classes = useStyles();
  const activeWord = useSelector(activeWordSelector);

  const chooseSymbol = useMemo(() => {
    if (activeWord && activeWord.isItAnswered) {
      return <i className="icon-difficult"></i>;
    }

    return <i className={`icon-difficult ${classes.transparent}`}></i>;
  }, [activeWord, classes.transparent]);

  return <div className={classes.mark}>{chooseSymbol}</div>;
};
