import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '../../../../../routing/routes';
import { useStyles } from './ExitButton.styles';

export const ExitButton = () => {
  const history = useHistory();
  const classes = useStyles();

  const goToTheMainPage = useCallback(() => history.push({ pathname: ROUTES.GAMES }), [history]);

  return (
    <div className={classes.symbol} onClick={goToTheMainPage}>
      <i className="icon-removed"></i>
    </div>
  );
};
