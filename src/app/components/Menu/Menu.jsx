import React from 'react';

import NavState from './context/NavState';
import MainMenu from './components/MainMenu/MainMenu';

export const Menu = () => {
  return (
    <NavState>
      <MainMenu />
    </NavState>
  );
};
