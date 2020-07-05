import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './GameModeSelector.styles';
import { GAME_MODES } from '../../../LearningPage.models';
import { Mode } from './Mode/Mode';
import { useOnClickOutside } from '../../../../Menu/components/onClickOutside';

export const GameModeSelector = ({ selectedCategory, onSelectClick }) => {
  const [isOpen, updateDropdownState] = useState(false);
  const classes = useStyles({ isOpen });
  const dropDownMenu = useRef(null);

  const onSelect = useCallback(
    level => {
      updateDropdownState(false);
      onSelectClick(level);
    },
    [onSelectClick],
  );

  const onClick = useCallback(() => updateDropdownState(!isOpen), [isOpen]);
  useOnClickOutside(dropDownMenu, () => updateDropdownState(false));

  return (
    <div ref={dropDownMenu} className={classes.categoryPicker} onClick={onClick}>
      <div className={classes.dropdownButton}>{selectedCategory}</div>
      {
        <div className={classes.dropdownList}>
          {GAME_MODES.map((mode, index, arr) => (
            <Mode
              key={mode}
              mode={mode}
              isSelected={mode === selectedCategory}
              isLast={arr.length - 1 === index}
              onSelect={onSelect}
            />
          ))}
        </div>
      }
    </div>
  );
};

GameModeSelector.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onSelectClick: PropTypes.func.isRequired,
};
