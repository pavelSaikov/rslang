import React, { useCallback } from 'react';

import { Timer } from './components/Timer';

export const Sprint = () => {
  const onTimerEnd = useCallback(() => {
    console.log('End game. Showing statistics');
  }, []);

  return (
    <div>
      <Timer onTimerEnd={onTimerEnd} time={10} />
    </div>
  );
};
