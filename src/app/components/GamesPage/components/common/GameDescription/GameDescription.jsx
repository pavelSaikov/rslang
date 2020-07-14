import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from './GameDescription.styles';
import { DifficultySelector } from './components/DifficultySelector/DifficultySelector';
import { setLevel } from './store/GameDescription.action';
import { levelSelector } from './store/DifficultySelector.selector';
import { Button } from '../../../../LearningPage/components/UserWordAssessment/Button/Button';
import { useStyles as useStylesButton } from './GameDescription.styles';

export const GameDescription = ({
  gameName,
  shortDescription,
  onStartGameWithUserWords,
  onStartGameWithRandomWords,
}) => {
  const dispatch = useDispatch();
  const { button } = useStylesButton();
  const classes = useStyles();
  const selectedLevel = useSelector(levelSelector);

  const onLevelSelect = useCallback(level => dispatch(setLevel({ level })), [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapperFlexColumn}>
        <div className={classes.wrapperFlexRow}>
          <div className={classes.header}>
            <h2>{gameName}</h2>
          </div>
        </div>
        <div className={classes.wrapperFlexRow}>
          <div>{shortDescription}</div>
        </div>
        <div className={classes.wrapperFlexButton}>
          <Button
            styleClasses={button}
            message="Играть с пользовательскими словами"
            onClick={onStartGameWithUserWords}
          />
          <Button styleClasses={button} message="Играть со случайными словами" onClick={onStartGameWithRandomWords} />
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
