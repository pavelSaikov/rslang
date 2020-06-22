import React, { useCallback } from 'react';

import { Timer } from './components/Timer';

import { Word } from './components/Word';

export const Sprint = () => {
  const onTimerEnd = useCallback(() => {}, []);

  return (
    <div>
      <Timer onTimerEnd={onTimerEnd} time={10} />
      <h2>Sprint Start Page</h2>
      <Word />
    </div>
  );
};
