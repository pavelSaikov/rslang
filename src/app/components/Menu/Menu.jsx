import React from 'react';

import { useStyles } from './Menu.styles';
import { MenuHeader } from './components/Header/MenuHeader';
import { Navigation } from './components/Navigation/Navigation';
import { MenuFooter } from './components/Footer/MenuFooter';

export const Menu = () => {
  const { menu } = useStyles();
  return (
    <div className={menu}>
      <MenuHeader />
      <Navigation />
      <MenuFooter />
    </div>
  );
};
