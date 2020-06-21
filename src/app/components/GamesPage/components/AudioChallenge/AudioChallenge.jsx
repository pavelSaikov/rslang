import React from 'react';
import { PlayWordAudioButton } from './components/PlayWordAudioButton/PlayWordAudioButton';
import { GAME_LINK } from './AudioChallenge.models';
import { useStyles } from './AudioChallenge.styles';

export const AudioChallenge = () => {
  const classes = useStyles();
  const linkToWord = GAME_LINK;

  return (
    <div className={classes.audioChallenge}>
      <PlayWordAudioButton linkToWord={linkToWord} />
    </div>
  );
};
