import React from 'react';

import Load from '../../../../../assets/images/loading.svg';
import { Menu } from '../../../Menu/Menu';
import { useStyles } from './Loading.styles';

export const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageWrapper}>
      <Menu />
      <div className={classes.contentContainer}>
        <div className={classes.imageContainer}>
          <img src={Load} />
          <h3>Loading</h3>
        </div>
      </div>
    </div>
  );
};
