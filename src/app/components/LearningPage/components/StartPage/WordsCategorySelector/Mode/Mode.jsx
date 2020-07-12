import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Mode.styles';

export const Mode = ({ mode, isSelected, isLast = false, onSelect, translation }) => {
  const classes = useStyles({ isLast, isSelected });

  const handleClick = useCallback(() => onSelect(mode), [mode, onSelect]);

  return (
    <div className={classes.modeItem} onClick={handleClick}>
      {translation}
    </div>
  );
};

Mode.propTypes = {
  mode: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
