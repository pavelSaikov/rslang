import React from 'react';

import { GameDescription } from '../GameDescription/GameDescription';
import { GAME_INFO } from './SpeakIt.models';

export const SpeakIt = () => {
  return (
    <div>
      <GameDescription gameName={GAME_INFO.NAME} shortDescription={GAME_INFO.SHORT_DESCRIPTION} />
    </div>
  );
};
