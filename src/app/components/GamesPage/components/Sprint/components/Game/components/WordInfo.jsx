import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './WordInfo.style';
import { WordAudio } from './WordAudio';

export const WordInfo = ({ word, translation, wordAudio }) => {
  const { wordInfoWrapper, wordStyle, wordAudioStyle, translationStyle } = useStyles();

  return (
    <div className={wordInfoWrapper}>
      <div className={wordAudioStyle}>
        <WordAudio wordAudio={wordAudio} />
      </div>
      <div className={wordStyle}>{word}</div>
      {' — '}
      <div className={translationStyle}>{translation}</div>
    </div>
  );
};

WordInfo.propTypes = {
  word: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  wordAudio: PropTypes.string.isRequired,
};
