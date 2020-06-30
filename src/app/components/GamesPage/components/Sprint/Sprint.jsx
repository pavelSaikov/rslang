import React, { useCallback } from 'react';

import { Timer } from './components/Timer';

export const Sprint = () => {
  const onTimerEnd = useCallback(() => {}, []);

  return (
    <div>
      <Timer onTimerEnd={onTimerEnd} time={10} />
    </div>
  );
};
