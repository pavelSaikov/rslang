import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useStyles } from './GameCard.styles';

export const GameCard = ({ name, link, onLinkClick }) => {
  const classes = useStyles(name);
  const { path } = useRouteMatch();

  return (
    <div className={classes.gameCard}>
      <h1 className={classes.gameName}>{name}</h1>
      <Link to={`${path}${link}`} className={classes.gameLink} onClick={onLinkClick}>
        Играть!
      </Link>
    </div>
  );
};

GameCard.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
