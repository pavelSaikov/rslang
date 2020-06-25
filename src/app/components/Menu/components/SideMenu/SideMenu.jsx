import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './SideMenu.styles';
import { MenuContext } from '../../context/NavState';
import { Navigation } from '../Navigation/Navigation';
import { MenuFooter } from '../Footer/MenuFooter';

export const SideMenu = ({ children }) => {
  const { isMenuOpen } = useContext(MenuContext);
  const { navigation } = useStyles(isMenuOpen);

  return (
    <nav className={navigation} open={isMenuOpen}>
      {children}
    </nav>
  );
};

SideMenu.propTypes = {
  children: PropTypes.node,
};

SideMenu.defaultProps = {
  children: (
    <>
      <Navigation />
      <MenuFooter />
    </>
  ),
};
