import React from 'react';

import { useStyles } from './MenuFooter.styles';

export const MenuFooter = () => {
  const { footer, footerLink, navigationIcon } = useStyles();
  return (
    <div className={footer}>
      <p className={footerLink}>
        <i className={`${'icon-exit'} ${navigationIcon}`}></i>
        Log Out
      </p>
    </div>
  );
};
