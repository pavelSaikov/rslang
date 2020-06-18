import React from 'react';

import { useStyles } from './Footer.styles';

export const Footer = () => {
  const { footer } = useStyles();
  return <div className={footer}>Log Out</div>;
};
