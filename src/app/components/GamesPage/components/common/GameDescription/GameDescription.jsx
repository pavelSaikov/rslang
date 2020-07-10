import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from './GameDescription.styles';
import { Button } from '../../../../AuthorizationPage/components/Button/Button';
import { DifficultySelector } from './components/DifficultySelector/DifficultySelector';
import { setLevel } from './store/GameDescription.action';
import { levelSelector } from './store/DifficultySelector.selector';

export const GameDescription = ({
  gameName,
  shortDescription,
  onStartGameWithUserWords,
  onStartGameWithRandomWords,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedLevel = useSelector(levelSelector);

  const onLevelSelect = useCallback(level => dispatch(setLevel({ level })), [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapperFlexColumn}>
        <div className={classes.wrapperFlexRow}>
          <div className={classes.header}>{gameName}</div>
        </div>
        <div className={classes.wrapperFlexRow}>
          <div>{shortDescription}</div>
        </div>
        <div className={classes.wrapperFlexButton}>
          <Button text="Start With User Words" onClickFunc={onStartGameWithUserWords} />
          <Button text="Start With Random Words" onClickFunc={onStartGameWithRandomWords} />
          <DifficultySelector selectedLevel={selectedLevel} onSelect={onLevelSelect} />
        </div>
      </div>
    </div>
  );
};

GameDescription.propTypes = {
  gameName: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  onStartGameWithUserWords: PropTypes.func.isRequired,
  onStartGameWithRandomWords: PropTypes.func.isRequired,
};
