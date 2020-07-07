import React from 'react';
import { useSelector } from 'react-redux';

import { useStyles } from './Illustration.styles';
import { activeWordSelector } from '../../store/SpeakIt.selector';

export const Illustration = () => {
  const classes = useStyles();
  const activeWord = useSelector(activeWordSelector);

  return (
    <div className={classes.box}>
      <img src={activeWord ? activeWord.image : null} className={classes.illustration} />
    </div>
  );
};
