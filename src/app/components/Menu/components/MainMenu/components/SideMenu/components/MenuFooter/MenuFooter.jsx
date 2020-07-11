import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './MenuFooter.styles';

export const MenuFooter = ({ onLogOut }) => {
  const { footer, footerLink, navigationIcon } = useStyles();

  return (
    <div className={footer} onClick={onLogOut}>
      <p className={footerLink}>
        <i className={`${'icon-exit'} ${navigationIcon}`}></i>
        Выйти
      </p>
    </div>
  );
};

MenuFooter.propTypes = {
  onLogOut: PropTypes.func.isRequired,
};
