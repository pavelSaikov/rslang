/* eslint-disable indent */
import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { settingsSelector } from '../../../SettingsPage/store/Settings.selectors';
import { Sentence } from './Sentence/Sentence';
import { useStyles } from './WordCard.styles';
import { Button } from '../UserWordAssessment/Button/Button';
import { DELAY } from './WordCard.models';

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
  onCorrectInput,
  onIncorrectInput,
  onShowAnswerClick,
  onAutoPlayToggle,
  isAutoPlayActive,
  isShowAnswer,
  gameWordIndex,
}) => {
  const classes = useStyles();
  const settings = useSelector(settingsSelector);
  const [isShowSentencesTranslation, setIsShowSentencesTranslation] = useState(false);
  const [isIgnoreCallbacksUpdate, setIsIgnoreCallbacksUpdate] = useState(true);
  const [isCheckUserAnswer, setIsCheckUserAnswer] = useState(false);
  const audioPlayer = useRef(new Audio());
  const timerId = useRef(null);

  useEffect(() => () => clearTimeout(timerId.current), []);

  useEffect(() => {
    setIsShowSentencesTranslation(false);
    setIsIgnoreCallbacksUpdate(false);
  }, [gameWordIndex]);

  useEffect(() => {
    if (!isShowAnswer || isIgnoreCallbacksUpdate || isShowSentencesTranslation) {
      return;
    }
    setIsIgnoreCallbacksUpdate(true);
    setIsShowSentencesTranslation(true);

    if (isAutoPlayActive) {
      playAudio({ audioPlayer, audio, audioExample, audioMeaning, settings, onCorrectInput }).then(() =>
        onCorrectInput(),
      );
    } else {
      timerId.current = setTimeout(() => {
        onCorrectInput();
      }, DELAY);
    }
  }, [
    isShowAnswer,
    isAutoPlayActive,
    audioPlayer,
    audio,
    audioExample,
    audioMeaning,
    isIgnoreCallbacksUpdate,
    onCorrectInput,
    settings,
    isShowSentencesTranslation,
  ]);

  const textMeaningPrepared = useMemo(() => {
    if (isShowSentencesTranslation) {
      return textMeaning;
    }

    return textMeaning
      .split(' ')
      .reduce(
        (result, word, index) =>
          word.includes('<')
            ? result.concat(' ', '_'.repeat(word.length + 1))
            : index
            ? result.concat(' ', word)
            : result.concat(word),
        '',
      );
  }, [isShowSentencesTranslation, textMeaning]);

  const textExamplePrepared = useMemo(() => {
    if (isShowSentencesTranslation) {
      return textExample;
    }

    return textExample
      .split(' ')
      .reduce(
        (result, word, index) =>
          word.includes('<')
            ? result.concat(' ', '_'.repeat(word.length + 1))
            : index
            ? result.concat(' ', word)
            : result.concat(word),
        '',
      );
  }, [isShowSentencesTranslation, textExample]);

  const onCorrect = useCallback(() => {
    setIsShowSentencesTranslation(true);
    setIsIgnoreCallbacksUpdate(true);

    setIsCheckUserAnswer(false);

    if ((audioPlayer.current.currentSrc && !audioPlayer.current.ended) || !isAutoPlayActive) {
      timerId.current = setTimeout(() => onCorrectInput(), DELAY);
      return;
    }

    playAudio({ audioPlayer, audio, audioExample, audioMeaning, settings }).then(() => onCorrectInput());
  }, [isAutoPlayActive, settings, audio, audioMeaning, audioExample, onCorrectInput]);

  const onIncorrect = useCallback(() => {
    onIncorrectInput();
    setIsCheckUserAnswer(false);
  }, [onIncorrectInput]);

  const onAutoplayToggleClick = useCallback(() => onAutoPlayToggle(), [onAutoPlayToggle]);

  const onCheckUserAnswerClick = useCallback(() => {
    if (!isCheckUserAnswer && !isShowSentencesTranslation) {
      setIsCheckUserAnswer(true);
    }
  }, [isCheckUserAnswer, isShowSentencesTranslation]);

  return (
    <div className={classes.wordCard}>
      <div className={`${classes.container}`}>
        <Sentence
          textExample={textExample}
          onCorrectInput={onCorrect}
          onIncorrectInput={onIncorrect}
          isShowAnswer={isShowAnswer}
          gameWordIndex={gameWordIndex}
          isCheckAnswerClick={isCheckUserAnswer}
        />
      </div>
      {
        <div className={`${classes.imageAndTranslationContainer} ${classes.container}`}>
          {settings.isAssociationPictureVisible && (
            <div className={classes.imageContainer}>
              <img src={image} className={classes.image} />
            </div>
          )}
          {settings.isTranslationVisible && <div className={classes.translation}>{wordTranslate}</div>}
          <div className={classes.voiceToggleContainer}>
            <i
              className={isAutoPlayActive ? 'icon-volume-high' : 'icon-volume-mute'}
              onClick={onAutoplayToggleClick}
            ></i>
          </div>
        </div>
      }
      {settings.isTranscriptionVisible && <div className={classes.container}>{transcription}</div>}
      {settings.isWordDescriptionVisible && (
        <div className={classes.container}>
          <div>Description</div>
          <div dangerouslySetInnerHTML={{ __html: textMeaningPrepared }}></div>
          {isShowSentencesTranslation && settings.isWordDescriptionTranslationVisible && (
            <div>{textMeaningTranslate}</div>
          )}
        </div>
      )}
      {settings.isExampleSentenceVisible && (
        <div className={classes.container}>
          <div>Example</div>
          <div dangerouslySetInnerHTML={{ __html: textExamplePrepared }}></div>
          {isShowSentencesTranslation && settings.isExampleSentenceTranslationVisible && (
            <div>{textExampleTranslate}</div>
          )}
        </div>
      )}
      <div className={classes.buttonsContainer}>
        <Button onClick={onCheckUserAnswerClick} message={'Check Answer'} styleClasses={classes.button} />
        {settings.isShowAnswerButtonAvailable && (
          <Button onClick={onShowAnswerClick} message={'Show Answer'} styleClasses={classes.button} />
        )}
      </div>
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
  onCorrectInput: PropTypes.func.isRequired,
  onIncorrectInput: PropTypes.func.isRequired,
  onAutoPlayToggle: PropTypes.func.isRequired,
  onShowAnswerClick: PropTypes.func.isRequired,
  isAutoPlayActive: PropTypes.bool.isRequired,
  isShowAnswer: PropTypes.bool.isRequired,
  gameWordIndex: PropTypes.number.isRequired,
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

const playAudio = ({ audioPlayer, audio, audioExample, audioMeaning, settings }) => {
  return configureAudioPlayer(audioPlayer, true, audio)
    .then(() => configureAudioPlayer(audioPlayer, settings.isWordDescriptionVisible, audioMeaning))
    .then(() => configureAudioPlayer(audioPlayer, settings.isExampleSentenceVisible, audioExample));
};
