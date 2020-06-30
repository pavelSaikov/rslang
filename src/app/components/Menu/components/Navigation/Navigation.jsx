import React from 'react';
import { Link } from 'react-router-dom';

import { useStyles } from './Navigation.styles';
import { NAVIGATION } from './navigation.model';

export const Navigation = () => {
  const { navigationLink, navigationIcon, navigationList } = useStyles();
  return (
    <ul className={navigationList}>
      {NAVIGATION.map(value => {
        return (
          <Link key={value.link} className={navigationLink} to={value.link}>
            <i className={`${value.icon} ${navigationIcon}`}></i>
            {value.name}
          </Link>
        );
      })}
    </ul>
  );
};
