import React from 'react';
import { useSelector } from 'react-redux';

import { useStyles } from './Translation.styles';
import { activeWordSelector } from '../../store/SpeakIt.selector';

export const Translation = () => {
  const classes = useStyles();
  const activeWord = useSelector(activeWordSelector);

  return <div className={classes.translation}>{activeWord ? activeWord.wordTranslate : 'translation'}</div>;
};
