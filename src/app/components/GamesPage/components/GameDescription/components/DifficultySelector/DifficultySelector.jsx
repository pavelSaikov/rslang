import React, { useCallback, useRef, useReducer } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './DifficultySelector.styles';
import { DifficultyLevel } from './components';
import { LEVELS } from './DifficultySelector.models';

export const DifficultySelector = React.memo(({ selectedLevel, onSelect: onSelectHandler }) => {
  const [isOpen, updateDropdownState] = useReducer((state, value) => (value ? state : !state), false);
  const classes = useStyles(isOpen);
  const picker = useRef(null);

  const onSelect = useCallback(
    level => {
      updateDropdownState(false);
      onSelectHandler(level);
    },
    [onSelectHandler],
  );

  const onDropdownClick = useCallback(() => updateDropdownState(), []);

  return (
    <div ref={picker} className={classes.levelPicker}>
      <div className={classes.dropdownButton} onClick={onDropdownClick}>
        {selectedLevel}
      </div>
      {isOpen ? (
        <div className={classes.dropdownList}>
          {LEVELS.map((level, index, arr) => (
            <DifficultyLevel
              key={level}
              level={level}
              isSelected={level === selectedLevel}
              isLast={arr.length - 1 === index}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
});

DifficultySelector.displayName = 'DifficultySelector';

DifficultySelector.propTypes = {
  selectedLevel: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
