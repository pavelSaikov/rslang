import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../../routing/routes';
import { useStyles } from './Navigation.styles';

export const Navigation = () => {
  const { navigationLink, navigationIcon, navigationList } = useStyles();
  return (
    <ul className={navigationList}>
      <Link className={navigationLink} to={ROUTES.LOGIN}>
        <i className={`${'icon-enter'} ${navigationIcon}`}></i>
        Login
      </Link>
      <Link className={navigationLink} to={ROUTES.LEARNING}>
        <i className={`${'icon-book'} ${navigationIcon}`}></i>
        Learning
      </Link>
      <Link className={navigationLink} to={ROUTES.DICTIONARY}>
        <i className={`${'icon-floppy-disk'} ${navigationIcon}`}></i>
        Dictionary
      </Link>
      <Link className={navigationLink} to={ROUTES.GAMES}>
        <i className={`${'icon-pacman'} ${navigationIcon}`}></i>
        Mini games
      </Link>
      <Link className={navigationLink} to={ROUTES.STATISTIC}>
        <i className={`${'icon-stats-bars'} ${navigationIcon}`}></i>
        Statistics
      </Link>
      <Link className={navigationLink} to={ROUTES.TEAM}>
        <i className={`${'icon-users'} ${navigationIcon}`}></i>
        Our Team
      </Link>
      <Link className={navigationLink} to={ROUTES.SETTINGS}>
        <i className={`${'icon-cog'} ${navigationIcon}`}></i>
        Settings
      </Link>
    </ul>
  );
};
