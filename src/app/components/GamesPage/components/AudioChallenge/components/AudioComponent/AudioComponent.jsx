import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './AudioComponent.styles';

export const AudioComponent = ({ gameStatus, isAudioPlay, setIsAudioPlay, correctAnswerInThisRound }) => {
  const classes = useStyles({ gameStatus, correctAnswerInThisRound });
  const audioElement = useRef(null);
  const buttonPlayClick = useCallback(() => {
    !isAudioPlay && audioElement.current.play();
    setIsAudioPlay(true);
  }, [isAudioPlay, setIsAudioPlay]);

  useEffect(() => {
    audioElement.current = new Audio(correctAnswerInThisRound.audio);
    audioElement.current.play();
    setIsAudioPlay(true);
    audioElement.current.addEventListener('ended', () => {
      setIsAudioPlay(false);
    });

    return () => {
      audioElement.current.removeEventListener('ended', () => {
        setIsAudioPlay(false);
      });
    };
  }, [correctAnswerInThisRound.audio, setIsAudioPlay]);

  return (
    <div className={classes.audioComponent}>
      <div className={classes.audioComponentWrapper}>
        <div className={classes.audioComponentImg}></div>
        <div className={classes.audioComponentButton} onClick={buttonPlayClick}>
          <i className={`icon-volume-medium ${classes.audioComponentIcon}`} />
        </div>
        <p className={classes.audioComponentTranslate}>{correctAnswerInThisRound.word}</p>
      </div>
    </div>
  );
};

AudioComponent.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  correctAnswerInThisRound: PropTypes.object.isRequired,
  setIsAudioPlay: PropTypes.func.isRequired,
  isAudioPlay: PropTypes.bool.isRequired,
};
