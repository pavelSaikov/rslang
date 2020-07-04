import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useStyles } from './HamburgerButton.style';
import { menuSelector } from '../../../../store/Menu.selectors';
import { setIsMenuOpen } from '../../../../store/Menu.actions';

export const HamburgerButton = () => {
  const isMenuOpen = useSelector(menuSelector);
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    dispatch(setIsMenuOpen(!isMenuOpen));
  }, [isMenuOpen, dispatch]);

  const { line, hamburgerButton } = useStyles();

  return (
    <button
      className={`${isMenuOpen ? 'active' : ''} ${hamburgerButton}`}
      aria-label="Open main menu"
      onClick={clickHandler}
    >
      <span className={line} />
      <span className={line} />
      <span className={line} />
    </button>
  );
};
