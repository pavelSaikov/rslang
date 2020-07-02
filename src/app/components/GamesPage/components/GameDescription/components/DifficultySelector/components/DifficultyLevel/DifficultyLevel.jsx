import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './DifficultyLevel.styles';

export const DifficultyLevel = React.memo(({ level, isSelected, isLast = false, onSelect }) => {
  const classes = useStyles({ isLast, isSelected });

  const handleClick = useCallback(() => {
    onSelect(level);
  }, [level, onSelect]);

  return (
    <div className={classes.levelItem} onClick={handleClick}>
      {level}
    </div>
  );
});

DifficultyLevel.propTypes = {
  level: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
