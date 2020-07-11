import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useStyles } from './Star.styles';
import { setOfWordsSelector } from '../../store/SpeakIt.selector';

export const Star = () => {
  const classes = useStyles();
  const arrOfWords = useSelector(setOfWordsSelector);
  const chooseSymbol = useMemo(() => {
    const tempArray = arrOfWords.map(el => {
      if (el.isItAnswered) {
        return <i key={el.word} className="icon-difficult"></i>;
      }
    });
    if (tempArray.length) {
      return tempArray;
    }

    return <i className={`icon-difficult ${classes.transparent}`}></i>;
  }, [arrOfWords, classes]);

  return <div className={classes.mark}>{chooseSymbol}</div>;
};
