import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from '../../Sprint.style';

export const StartWindow = ({ startGame }) => {
  const { buttons } = useStyles();

  return (
    <div>
      <button className={buttons} onClick={startGame}>
        Старт!
      </button>
    </div>
  );
};

StartWindow.propTypes = {
  startGame: PropTypes.func.isRequired,
};
