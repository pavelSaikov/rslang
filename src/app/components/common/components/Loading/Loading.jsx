import React from 'react';

import Load from '../../../../../assets/images/loading.svg';
import { useStyles } from './Loading.styles';

export const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.contentContainer}>
        <div className={classes.imageContainer}>
          <img src={Load} />
          <h3>Загрузка</h3>
        </div>
      </div>
    </div>
  );
};
