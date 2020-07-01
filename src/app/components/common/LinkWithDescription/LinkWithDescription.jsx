import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './LinkWithDescription.styles';
import { Link } from 'react-router-dom';

export const LinkWithDescription = ({ description, linkCaption, path }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.description}>
        {description} <Link to={path}>{linkCaption}</Link>
      </div>
    </div>
  );
};

LinkWithDescription.propTypes = {
  description: PropTypes.string.isRequired,
  linkCaption: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
