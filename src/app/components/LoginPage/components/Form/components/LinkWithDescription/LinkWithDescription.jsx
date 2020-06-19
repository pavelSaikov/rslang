import React from 'react';
import { useStyles } from './LinkWithDescription.styles';
import PropTypes from 'prop-types';

const LinkWithDescription = ({ description, path, linkCaption }) => {
  const classes = useStyles();

  return (
    <div className={classes.description}>
      {description}
      <a className={classes.link} href={path}>
        {linkCaption}
      </a>
    </div>
  );
};

export default LinkWithDescription;

LinkWithDescription.propTypes = {
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  linkCaption: PropTypes.string.isRequired,
};
