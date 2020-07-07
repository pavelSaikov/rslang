import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useStyles } from './SideMenu.styles';
import { Navigation } from './components/Navigation/Navigation';
import { MenuFooter } from './components/MenuFooter/MenuFooter';
import { menuSelector } from '../../../../store/Menu.selectors';
import { setAuthorizationInfo } from '../../../../../AuthorizationPage/store/AuthorizationPage.actions';
import { ROUTES } from '../../../../../../routing/routes';
import { setIsMenuOpen } from '../../../../store/Menu.actions';

export const SideMenu = () => {
  const isMenuOpen = useSelector(menuSelector);
  const { navigation } = useStyles(isMenuOpen);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogOut = useCallback(() => {
    dispatch(setAuthorizationInfo(null));
    dispatch(setIsMenuOpen(false));
    history.push(ROUTES.LOGIN);
  }, [dispatch, history]);

  const onLinkClick = useCallback(() => dispatch(setIsMenuOpen(false)), [dispatch]);

  return (
    <div className={navigation} open={isMenuOpen} id={'navigation'}>
      <Navigation onLinkClick={onLinkClick} />
      <MenuFooter onLogOut={onLogOut} />
    </div>
  );
};
