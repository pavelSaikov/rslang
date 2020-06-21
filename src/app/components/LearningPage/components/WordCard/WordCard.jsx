import React, { useCallback, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { settingsSelector } from '../../../SettingsPage/store/Settings.selectors';
import { Sentence } from './Sentence/Sentence';
import { useStyles } from './WordCard.styles';

export const WordCard = ({
  wordInfo: {
    wordTranslate,
    textMeaning,
    audioMeaning,
    textMeaningTranslate,
    textExample,
    audioExample,
    textExampleTranslate,
    transcription,
    image,
    audio,
  },
  onInput,
}) => {
  const classes = useStyles();
  const settings = useSelector(settingsSelector);
  const [isUserInputCorrect, setIsUserInputCorrect] = useState(false);
  const [isAutoPlaySelect, setIsAutoPlaySelect] = useState(true);
  const audioPlayer = useRef(new Audio());

  const onCorrectInput = useCallback(() => {
    setIsUserInputCorrect(true);
    onInput();

    if (!audioPlayer.current.currentSrc || !audioPlayer.current.ended || !isAutoPlaySelect) {
      return;
    }

    configureAudioPlayer(audioPlayer, true, audio)
      .then(() => configureAudioPlayer(audioPlayer, settings.requiredParameters.isWordDescriptionVisible, audioMeaning))
      .then(() =>
        configureAudioPlayer(audioPlayer, settings.requiredParameters.isExampleSentenceVisible, audioExample),
      );
  }, [isAutoPlaySelect, settings, audio, audioMeaning, audioExample, onInput]);

  const onIncorrectInput = useCallback(() => {
    onInput();
  }, [onInput]);

  const onAutoplayToggleClick = useCallback(() => {
    setIsAutoPlaySelect(state => !state);
  }, []);

  return (
    <div className={classes.wordCard}>
      <div className={`${classes.sentenceWithInput} ${classes.container}`}>
        <Sentence textExample={textExample} onCorrectInput={onCorrectInput} onIncorrectInput={onIncorrectInput} />{' '}
      </div>
      {(settings.isAssociationPictureVisible || settings.requiredParameters.isTranslationVisible) && (
        <div className={`${classes.imageAndTranslationContainer} ${classes.container}`}>
          {settings.isAssociationPictureVisible && (
            <div className={classes.imageContainer}>
              <img src={image} className={classes.image} />
            </div>
          )}
          {settings.requiredParameters.isTranslationVisible && (
            <div className={classes.translation}>{wordTranslate}</div>
          )}
        </div>
      )}
      {settings.isTranscriptionVisible && <div className={classes.container}>{transcription}</div>}
      {settings.requiredParameters.isWordDescriptionVisible && (
        <div className={classes.container}>
          <div>Description</div>
          <div dangerouslySetInnerHTML={{ __html: textMeaning }}></div>
          {isUserInputCorrect && <div>{textMeaningTranslate}</div>}
        </div>
      )}
      {settings.requiredParameters.isExampleSentenceVisible && (
        <div className={classes.container}>
          <div>Example</div>
          <div dangerouslySetInnerHTML={{ __html: textExample }}></div>
          {isUserInputCorrect && <div>{textExampleTranslate}</div>}
        </div>
      )}
      <div onClick={onAutoplayToggleClick}>{`AutoPlayToggle: ${isAutoPlaySelect}`}</div>
    </div>
  );
};

WordCard.propTypes = {
  wordInfo: PropTypes.shape({
    word: PropTypes.string.isRequired,
    wordTranslate: PropTypes.string.isRequired,
    textMeaning: PropTypes.string.isRequired,
    audioMeaning: PropTypes.string.isRequired,
    textMeaningTranslate: PropTypes.string.isRequired,
    textExample: PropTypes.string.isRequired,
    audioExample: PropTypes.string.isRequired,
    textExampleTranslate: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
  }),
  onInput: PropTypes.func.isRequired,
};

const configureAudioPlayer = (audioPlayer, flag, src) => {
  if (!flag) {
    return Promise.resolve();
  }

  audioPlayer.current.src = src;

  return new Promise(resolve => {
    audioPlayer.current.addEventListener('ended', function end() {
      resolve();
      audioPlayer.current.removeEventListener('ended', end);
    });
    audioPlayer.current.play();
  });
};
