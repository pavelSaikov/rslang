import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './WordAudio.style';

export const WordAudio = ({ wordAudio }) => {
  const onPlay = useCallback(() => makeSomeNoise(wordAudio), [wordAudio]);
  const { audioWrapper } = useStyles();

  return (
    <div className={audioWrapper}>
      <i className={'icon-volume-medium'} onClick={onPlay}></i>
    </div>
  );
};

WordAudio.propTypes = {
  wordAudio: PropTypes.string.isRequired,
};

const makeSomeNoise = wordAudio => {
  const audio = new Audio(wordAudio);
  audio.play();
};
