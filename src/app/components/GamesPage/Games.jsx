import React, { useState, useEffect, useCallback } from 'react';
import { Switch, useRouteMatch, useLocation } from 'react-router-dom';

import { PrivateRoute } from '../../routing/PrivateRoute';
import { GameCard } from './components/GameCard/GameCard';
import { CARDS } from './components/GameCard/GameCard.models';
import { useStyles } from './Games.styles';
import { ROUTES } from '../../routing/routes';

export const Games = () => {
  const location = useLocation();
  const { path } = useRouteMatch();
  const classes = useStyles();
  const [isGameSelected, setIsGameSelected] = useState(false);

  useEffect(() => {
    if (location.pathname === ROUTES.GAMES) setIsGameSelected(false);
  }, [location]);

  const onLinkClick = useCallback(() => setIsGameSelected(true), []);

  return (
    <div>
      {!isGameSelected && (
        <div>
          <h2> Games Page</h2>
          <div className={classes.gameCards}>
            {CARDS.map(CARDS => {
              return (
                <GameCard
                  key={CARDS.name}
                  onLinkClick={onLinkClick}
                  iconClass={CARDS.iconClass}
                  name={CARDS.name}
                  link={CARDS.link}
                />
              );
            })}
          </div>
        </div>
      )}

      <Switch>
        {CARDS.map(card => {
          return <PrivateRoute exact path={`${path}${card.link}`} component={card.component} key={card.link} />;
        })}
      </Switch>
    </div>
  );
};
