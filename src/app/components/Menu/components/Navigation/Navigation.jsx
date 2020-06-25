import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '../../../../routing/routes';
import { useStyles } from './Navigation.styles';

export const Navigation = () => {
  let location = useLocation();
  console.log(location);

  const handleClick = () => {
    console.log('change');
  };

  const { navigationLink, navigationIcon, navigationList } = useStyles();
  return (
    <ul className={navigationList}>
      <Link className={navigationLink} to={ROUTES.LOGIN} onSelect={handleClick}>
        <i className={`${'icon-enter'} ${navigationIcon}`}></i>
        Login
      </Link>
      <Link className={navigationLink} to={ROUTES.LEARNING} onSelect={handleClick}>
        <i className={`${'icon-book'} ${navigationIcon}`}></i>
        Learning
      </Link>
      <Link className={navigationLink} to={ROUTES.DICTIONARY} onSelect={handleClick}>
        <i className={`${'icon-floppy-disk'} ${navigationIcon}`}></i>
        Dictionary
      </Link>
      <Link className={navigationLink} to={ROUTES.GAMES} onSelect={handleClick}>
        <i className={`${'icon-pacman'} ${navigationIcon}`}></i>
        Mini games
      </Link>
      <Link className={navigationLink} to={ROUTES.STATISTIC} onSelect={handleClick}>
        <i className={`${'icon-stats-bars'} ${navigationIcon}`}></i>
        Statistics
      </Link>
      <Link className={navigationLink} to={ROUTES.TEAM} onSelect={handleClick}>
        <i className={`${'icon-users'} ${navigationIcon}`}></i>
        Our Team
      </Link>
      <Link className={navigationLink} to={ROUTES.SETTINGS} onSelect={handleClick}>
        <i className={`${'icon-cog'} ${navigationIcon}`}></i>
        Settings
      </Link>
    </ul>
  );
};
