import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './PlayWordAudioButton.styles';

export const PlayWordAudioButton = ({ linkToAudio }) => {
  const classes = useStyles();
  const audioElement = useRef(null);

  const buttonPlayClick = useCallback(() => {
    audioElement.current.ended && audioElement.current.play();
  }, []);

  useEffect(() => {
    audioElement.current = new Audio(linkToAudio);
    audioElement.current.play();
  }, [linkToAudio]);

  return <div className={classes.playWordAudioButton} onClick={buttonPlayClick}></div>;
};

PlayWordAudioButton.propTypes = {
  linkToAudio: PropTypes.string.isRequired,
};
