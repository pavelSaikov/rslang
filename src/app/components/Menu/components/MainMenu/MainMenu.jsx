import React, { useRef, useCallback } from 'react';

import { useStyles } from './MainMenu.styles';
import { useOnClickOutside } from '../onClickOutside';
import { HamburgerButton } from '../HamburgerButton/HamburgerButton';
import { SideMenu } from '../SideMenu/SideMenu';
import { useSelector, useDispatch } from 'react-redux';
import { menuSelector } from '../../store/Menu.selectors';
import { setIsMenuOpen } from '../../store/Menu.actions';

export const MainMenu = () => {
  const { mainMenu } = useStyles();
  const node = useRef();
  const isMenuOpen = useSelector(menuSelector);
  const dispatch = useDispatch();

  const actionMenu = useCallback(() => {
    if (isMenuOpen) {
      dispatch(setIsMenuOpen(!isMenuOpen));
    }
  }, [isMenuOpen, dispatch]);

  useOnClickOutside(node, actionMenu);

  return (
    <header ref={node}>
      <div className={mainMenu}>
        <HamburgerButton />
      </div>
      <SideMenu />
    </header>
  );
};
