import React, { useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './WordInfo.styles';
import { settingsSelector } from '../../../SettingsPage/store/Settings.selectors';
import { useSelector } from 'react-redux';
import { WORD_STATUS } from '../../DictionaryPage.models';

export const WordInfo = ({
  wordInfo: {
    wordId,
    word,
    audio,
    image,
    transcription,
    wordTranslate,
    textMeaning,
    textExample,
    lastRepetition,
    repetitionNumber,
  },
  onStatusChangeClick,
  newStatus,
  isRemovable,
}) => {
  const {
    isTranslationVisible,
    isWordDescriptionVisible,
    isExampleSentenceVisible,
    isTranscriptionVisible,
    isAssociationPictureVisible,
  } = useSelector(settingsSelector);
  const classes = useStyles();
  const wordAudio = useRef(null);
  const textLastRepetition = useMemo(() => {
    const repetitionDate = new Date(lastRepetition);

    return ` ${repetitionDate.getHours()}:${repetitionDate.getMinutes()} ${repetitionDate.getDate()}.${
      repetitionDate.getMonth() + 1
    }.${repetitionDate.getFullYear()}`;
  }, [lastRepetition]);

  const onSpeakerClick = useCallback(() => {
    if (!wordAudio.current) {
      wordAudio.current = new Audio(audio);
      wordAudio.current.play();
      return;
    }

    if (wordAudio.current.ended) {
      wordAudio.current.play();
    }
  }, [wordAudio, audio]);

  const onChangeStatus = useCallback(() => onStatusChangeClick(newStatus, wordId), [
    onStatusChangeClick,
    newStatus,
    wordId,
  ]);
  const onSetStatusRemoved = useCallback(() => onStatusChangeClick(WORD_STATUS.REMOVED, wordId), [
    onStatusChangeClick,
    wordId,
  ]);

  return (
    <div className={classes.wordInfoContainer}>
      <div className={classes.header}>
        {isAssociationPictureVisible && (
          <div className={classes.imageContainer}>
            <img src={image} className={classes.image} />
          </div>
        )}
        <div className={classes.wordContainer}>{word}</div>
        {newStatus && (
          <div className={classes.changeStatusButtonContainer}>
            <i
              className={`${newStatus === WORD_STATUS.LEARNED ? 'icon-learned' : 'icon-difficult'} ${classes.icon}`}
              onClick={onChangeStatus}
            ></i>
          </div>
        )}
        {isRemovable && (
          <div className={classes.changeStatusButtonContainer}>
            <i className={`icon-removed ${classes.icon}`} onClick={onSetStatusRemoved}></i>
          </div>
        )}
      </div>
      <div className={classes.translationContainer}>
        {isTranslationVisible && <div>{wordTranslate}</div>}
        <div onClick={onSpeakerClick} className={classes.voiceIcon}>
          <i className={`icon-volume-medium ${classes.icon}`}></i>
        </div>
      </div>
      {isTranscriptionVisible && <div>{transcription}</div>}
      {isWordDescriptionVisible && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: textMeaning }}></div>
        </div>
      )}
      {isExampleSentenceVisible && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: textExample }}></div>
        </div>
      )}
      <div>
        <div>Repetitions number: {repetitionNumber}</div>
        <div>
          Last Repetition:
          {textLastRepetition}
        </div>
      </div>
    </div>
  );
};

WordInfo.propTypes = {
  wordInfo: PropTypes.shape({
    wordId: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    wordTranslate: PropTypes.string.isRequired,
    textMeaning: PropTypes.string.isRequired,
    textExample: PropTypes.string.isRequired,
    lastRepetition: PropTypes.number.isRequired,
    repetitionNumber: PropTypes.number.isRequired,
  }),
  onStatusChangeClick: PropTypes.func.isRequired,
  newStatus: PropTypes.string.isRequired,
  isRemovable: PropTypes.bool.isRequired,
};
