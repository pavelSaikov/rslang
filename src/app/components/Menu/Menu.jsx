import React from 'react';

import { useStyles } from './Menu.styles';
import { Header } from './components/Header/Header';
import { Navigation } from './components/Navigation/Navigation';
import { Footer } from './components/Footer/Footer';

export const Menu = () => {
  const { menu } = useStyles();
  return (
    <div className={menu}>
      <Header />
      <Navigation />
      <Footer />
    </div>
  );
};
