import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './SideMenu.styles';
import { Navigation } from '../Navigation/Navigation';
import { MenuFooter } from '../Footer/MenuFooter';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/Menu.selectors';

export const SideMenu = ({ children }) => {
  const isMenuOpen = useSelector(menuSelector);
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
