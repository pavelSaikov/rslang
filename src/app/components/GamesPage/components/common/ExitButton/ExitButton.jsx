import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTES } from '../../../../../routing/routes';
import { useStyles } from './ExitButton.styles';

export const ExitButton = ({ onCrossClick }) => {
  const history = useHistory();
  const classes = useStyles();

  const goToTheMainPage = useCallback(() => {
    onCrossClick();
    history.push({ pathname: ROUTES.GAMES });
  }, [history, onCrossClick]);

  return (
    <div className={classes.symbol} onClick={goToTheMainPage}>
      <i className="icon-removed"></i>
    </div>
  );
};

ExitButton.propTypes = {
  onCrossClick: PropTypes.func.isRequired,
};
