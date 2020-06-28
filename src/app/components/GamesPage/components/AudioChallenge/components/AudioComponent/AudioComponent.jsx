import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './AudioComponent.styles';

export const AudioComponent = ({ gameStatus, linkToAudio, linkToImg, correctAnswerTranslate }) => {
  const classes = useStyles({ gameStatus, linkToImg });
  const audioElement = useRef(null);
  const buttonPlayClick = useCallback(() => {
    audioElement.current.ended && audioElement.current.play();
  }, []);

  useEffect(() => {
    audioElement.current = new Audio(linkToAudio);
    audioElement.current.play();
  }, [linkToAudio]);

  return (
    <div className={classes.audioComponent}>
      <div className={classes.audioComponentWrapper}>
        <div className={classes.audioComponentImg}></div>
        <div className={classes.audioComponentButton} onClick={buttonPlayClick}>
          <i className={`icon-volume-medium ${classes.audioComponentIcon}`} />
        </div>
        <p className={classes.audioComponentTranslate}>{correctAnswerTranslate}</p>
      </div>
    </div>
  );
};

AudioComponent.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  linkToAudio: PropTypes.string.isRequired,
  linkToImg: PropTypes.string.isRequired,
  correctAnswerTranslate: PropTypes.string.isRequired,
};
