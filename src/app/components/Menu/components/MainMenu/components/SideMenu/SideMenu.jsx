import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useStyles } from './SideMenu.styles';
import { Navigation } from './components/Navigation/Navigation';
import { MenuFooter } from './components/MenuFooter/MenuFooter';
import { menuSelector } from '../../../../store/Menu.selectors';
import { ROUTES } from '../../../../../../routing/routes';
import { setIsMenuOpen } from '../../../../store/Menu.actions';
import { resetStore } from '../../../../../../store/App.actions';

export const SideMenu = () => {
  const isMenuOpen = useSelector(menuSelector);
  const [windowHeight, setWindowHeight] = useState(document.body.clientHeight);
  const { navigation } = useStyles({ isMenuOpen, windowHeight });
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogOut = useCallback(() => {
    history.push(ROUTES.LOGIN);
    dispatch(resetStore());
    dispatch(setIsMenuOpen(false));
  }, [dispatch, history]);

  const onLinkClick = useCallback(() => dispatch(setIsMenuOpen(false)), [dispatch]);

  useEffect(() => {
    const onChangingWindowHeight = () => setWindowHeight(document.body.clientHeight);
    window.addEventListener('resize', onChangingWindowHeight);

    return () => window.removeEventListener('resize', onChangingWindowHeight);
  });

  return (
    <div className={navigation} open={isMenuOpen} id={'navigation'}>
      <Navigation onLinkClick={onLinkClick} />
      <MenuFooter onLogOut={onLogOut} />
    </div>
  );
};
