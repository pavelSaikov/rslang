import React from 'react';

import { useStyles } from './Header.styles';

export const Header = () => {
  const { header } = useStyles();
  return <div className={header}>RSLang</div>;
};
