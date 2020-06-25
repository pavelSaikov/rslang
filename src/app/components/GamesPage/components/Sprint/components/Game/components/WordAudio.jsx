import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

export const WordAudio = ({ wordAudio }) => {
  const onPlay = useCallback(() => makeSomeNoise(wordAudio), [wordAudio]);

  return <i className={'icon-volume-medium'} onClick={onPlay}></i>;
};

WordAudio.propTypes = {
  wordAudio: PropTypes.string.isRequired,
};

const makeSomeNoise = wordAudio => {
  const audio = new Audio(wordAudio);
  audio.play();
};
