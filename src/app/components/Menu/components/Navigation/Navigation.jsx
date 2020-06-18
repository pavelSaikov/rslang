import React from 'react';

import { useStyles } from './Navigation.styles';

export const Navigation = () => {
  const { navigation } = useStyles();
  return (
    <nav className={navigation}>
      <ul>
        <li>Learning</li>
        <li>Dictionary</li>
        <li>Mimi games</li>
        <li>Statistics</li>
        <li>Our Team</li>
        <li>Settings</li>
      </ul>
    </nav>
  );
};
