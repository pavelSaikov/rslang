import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './ContinueButton.styles';
import { GAME_STATUS } from './../../AudioChallenge.models';

export const ContinueButton = ({ gameStatus, isAudioPlay, clickContinueButton }) => {
  const classes = useStyles(gameStatus);
  const valueBtn = useMemo(
    () =>
      gameStatus === GAME_STATUS.CHOICE ? (
        'НЕ ЗНАЮ'
      ) : (
        <i className={`icon-arrow-right2 ${classes.continueButtonIcon}`} />
      ),
    [classes.continueButtonIcon, gameStatus],
  );

  return (
    <button className={classes.continueButton} onClick={!isAudioPlay ? clickContinueButton : undefined}>
      {valueBtn}
    </button>
  );
};

ContinueButton.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  clickContinueButton: PropTypes.func.isRequired,
  isAudioPlay: PropTypes.bool.isRequired,
};
