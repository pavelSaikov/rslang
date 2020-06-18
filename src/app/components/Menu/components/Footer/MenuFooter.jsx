import React from 'react';

import { useStyles } from './MenuFooter.styles';

export const MenuFooter = () => {
  const { footer, footerLink } = useStyles();
  return (
    <div className={footer}>
      <p className={footerLink}>Log Out</p>
    </div>
  );
};
