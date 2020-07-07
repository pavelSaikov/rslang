import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useStyles } from './Navigation.styles';
import { NAVIGATION } from './navigation.model';

export const Navigation = ({ onLinkClick }) => {
  const { navigationLink, navigationIcon, navigationList } = useStyles();
  return (
    <div className={navigationList}>
      {NAVIGATION.map(value => {
        return (
          <Link key={value.link} className={navigationLink} to={value.link} onClick={onLinkClick}>
            <i className={`${value.icon} ${navigationIcon}`}></i>
            {value.name}
          </Link>
        );
      })}
    </div>
  );
};

Navigation.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};
