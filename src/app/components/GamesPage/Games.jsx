import React from 'react';
import { Link, Switch, useRouteMatch } from 'react-router-dom';

import { AudioChallenge } from './components/AudioChallenge/AudioChallenge';
import { EnglishPuzzle } from './components/EnglishPuzzle/EnglishPuzzle';
import { Savanna } from './components/Savanna/Savanna';
import { SpeakIt } from './components/SpeakIt/SpeakIt';
import { Sprint } from './components/Sprint/Sprint';
import { PrivateRoute } from '../../routing/PrivateRoute';
import { GAMES_ROUTES } from './routes';

export const Games = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <h2> Games Page</h2>
      <div>
        <div>
          <Link to={`${path}${GAMES_ROUTES.AUDIO_CHALLENGE}`}>Audio Challenge</Link>
        </div>
        <div>
          <Link to={`${path}${GAMES_ROUTES.ENGLISH_PUZZLE}`}>English Puzzle</Link>
        </div>
        <div>
          <Link to={`${path}${GAMES_ROUTES.SAVANNA}`}>Savanna</Link>
        </div>
        <div>
          <Link to={`${path}${GAMES_ROUTES.SPEAK_IT}`}>Speak It</Link>
        </div>
        <div>
          <Link to={`${path}${GAMES_ROUTES.SPRINT}`}>Sprint</Link>
        </div>
      </div>

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
