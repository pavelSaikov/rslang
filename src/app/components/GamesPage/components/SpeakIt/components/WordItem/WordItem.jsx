import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useStyles } from './WordItem.styles';
import { setActiveWord } from '../../store/SpeakIt.action';
import { Symbol } from '../Symbol/Symbol';

export const WordItem = ({ el }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onMegaphoneClick = useCallback(file => {
    const audio = new Audio(file);
    audio.play();
  }, []);

  const onWordClick = useCallback(word => dispatch(setActiveWord(word)), [dispatch]);

  return (
    <div className={classes.wordItem} onClick={() => onWordClick(el)}>
      <Symbol onMegaphoneClick={() => onMegaphoneClick(el.audio)} isItAnswered={el.isItAnswered} />
      <div className={classes.word}>{el.word}</div>
      <div className={classes.transcription}>{el.transcription}</div>
    </div>
  );
};

WordItem.propTypes = {
  el: PropTypes.object.isRequired,
};
