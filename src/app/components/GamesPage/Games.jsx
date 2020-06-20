import React, { useState, useEffect, useCallback } from 'react';
import { Switch, useRouteMatch, useLocation } from 'react-router-dom';

import { AudioChallenge } from './components/AudioChallenge/AudioChallenge';
import { EnglishPuzzle } from './components/EnglishPuzzle/EnglishPuzzle';
import { Savanna } from './components/Savanna/Savanna';
import { SpeakIt } from './components/SpeakIt/SpeakIt';
import { Sprint } from './components/Sprint/Sprint';
import { PrivateRoute } from '../../routing/PrivateRoute';
import { GAMES_ROUTES } from './routes';
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
        <PrivateRoute exact path={`${path}${GAMES_ROUTES.AUDIO_CHALLENGE}`}>
          <AudioChallenge />
        </PrivateRoute>
        <PrivateRoute exact path={`${path}${GAMES_ROUTES.ENGLISH_PUZZLE}`}>
          <EnglishPuzzle />
        </PrivateRoute>
        <PrivateRoute exact path={`${path}${GAMES_ROUTES.SAVANNA}`}>
          <Savanna />
        </PrivateRoute>
        <PrivateRoute exact path={`${path}${GAMES_ROUTES.SPEAK_IT}`}>
          <SpeakIt />
        </PrivateRoute>
        <PrivateRoute exact path={`${path}${GAMES_ROUTES.SPRINT}`}>
          <Sprint />
        </PrivateRoute>
      </Switch>
    </div>
  );
};
