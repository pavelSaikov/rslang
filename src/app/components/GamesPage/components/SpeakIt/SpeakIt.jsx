import React from 'react';

import { GameDescription } from '../common/GameDescription/GameDescription';
import { GAME_INFO } from './SpeakIt.models';
import { ExitButton } from '../common/ExitButton/ExitButton';

export const SpeakIt = () => {
  return (
    <div>
      <ExitButton />
      <GameDescription gameName={GAME_INFO.NAME} shortDescription={GAME_INFO.SHORT_DESCRIPTION} />
    </div>
  );
};
