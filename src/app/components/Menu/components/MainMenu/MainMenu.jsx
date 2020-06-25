import React, { useRef, useContext } from 'react';

import { useStyles } from './MainMenu.styles';
import useOnClickOutside from '../../Hooks/onClickOutside';
import { MenuContext } from '../../context/NavState';
import HamburgerButton from '../HamburgerButton/HamburgerButton';
import { SideMenu } from '../SideMenu/SideMenu';
import { MenuHeader } from '../Header/MenuHeader';

const MainMenu = () => {
  const { mainMenu } = useStyles();
  const node = useRef();
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);
  useOnClickOutside(node, () => {
    if (isMenuOpen) {
      toggleMenuMode();
    }
  });

  return (
    <header ref={node}>
      <div className={mainMenu}>
        <HamburgerButton />
        <MenuHeader />
      </div>
      <SideMenu />
    </header>
  );
};

export default MainMenu;
