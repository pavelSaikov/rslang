import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../../routing/routes';
import { useStyles } from './Navigation.styles';

export const Navigation = () => {
  const { navigation, navigationPage, navigationLink } = useStyles();
  return (
    <nav className={navigation}>
      <ul>
        <li className={navigationPage}>
          <Link className={navigationLink} to={ROUTES.LEARNING}>
            Learning
          </Link>
        </li>
        <li className={navigationPage}>
          <Link className={navigationLink} to={ROUTES.DICTIONARY}>
            Dictionary
          </Link>
        </li>
        <li className={navigationPage}>
          <Link className={navigationLink} to={ROUTES.GAMES}>
            Mimi games
          </Link>
        </li>
        <li className={navigationPage}>
          <Link className={navigationLink} to={ROUTES.STATISTIC}>
            Statistics
          </Link>
        </li>
        <li className={navigationPage}>
          <Link className={navigationLink} to={ROUTES.TEAM}>
            Our Team
          </Link>
        </li>
        <li className={navigationPage}>
          <Link className={navigationLink} to={ROUTES.SETTINGS}>
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};
