import React from 'react';

import construction from '../../../../../../assets/images/construction.svg';
import { Menu } from '../../../../Menu/Menu';
import { useStyles } from './WorkInProgress.styles';

export const WorkInProgress = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      <Menu />
      <div className={classes.contentContainer}>
        <div className={classes.imageContainer}>
          <img src={construction} width="100%" />
        </div>
        <div className={classes.headerContainer}>
          <h3>К сожалению, данная игра ещё не готова.</h3>
        </div>
      </div>
    </div>
  );
};
