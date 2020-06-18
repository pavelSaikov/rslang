import React from 'react';

import { ROUTES } from '../../../../routing/routes';
import { Link } from 'react-router-dom';
import { useStyles } from './MenuHeader.styles';

export const MenuHeader = () => {
  const { header, headerLink } = useStyles();
  return (
    <div className={header}>
      <Link className={headerLink} to={ROUTES.MAIN}>
        RSLang
      </Link>
    </div>
  );
};
