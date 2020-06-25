import React, { useContext } from 'react';
import { useStyles } from './HamburgerButton.style';
import { MenuContext } from '../../context/NavState';

const HamburgerButton = () => {
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);

  const clickHandler = () => {
    toggleMenuMode();
  };
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

export default HamburgerButton;
