import { wordsService } from '../../../../../services/WordsService/WordsService';
import { setCurrentSetOfWords, setSpeakItStatistics } from './SpeakIt.action';
import { addError, resetErrors } from '../../../../errors/store/Errors.actions';
import { store } from '../../../../../store';
import { updateCommonStatistics } from '../../../../LearningPage/store/LearningPage.thunks';

export const getArrayOfWords = ({ setGame, areUserWordsChosen, userDictionary }) => dispatch => {
  dispatch(resetErrors());

  if (areUserWordsChosen) {
    Promise.all(
      userDictionary.slice(0, 10).reduce((words, { wordId }) => {
        words.push(wordsService.getWordInfo({ wordId }));
        return words;
      }, []),
    ).then(res => {
      const result = res.map(({ audio, id, image, transcription, word, wordTranslate }) => ({
        audio,
        id,
        image,
        transcription,
        word,
        wordTranslate,
        isItAnswered: false,
      }));
      dispatch(setCurrentSetOfWords(result));
      setGame(true);
    });
    return;
  }

  wordsService
    .getWordsFromGroupAndPageLimitedWordsPerExampleSentence({
      groupNumber: 2,
      pageNumber: Math.round(Math.random() * 29),
    })
    .then(res => {
      const result = res.map(({ audio, id, image, transcription, word, wordTranslate }) => ({
        audio,
        id,
        image,
        transcription,
        word,
        wordTranslate,
        isItAnswered: false,
      }));
      dispatch(setCurrentSetOfWords(result));
      setGame(true);
    })
    .catch(e => {
      dispatch(addError(e));
    });
};

export const updateSpeakItStatistics = ({ setIsRedirectToLoginPage }) => dispatch => {
  const {
    statistics,
    speakIt: { words },
  } = store.getState();

  const speakItStatistics = statistics.speakItStatistics;
  const currentDate = new Date().toLocaleDateString('en-GB');
  const currentDateStatistics = speakItStatistics[currentDate]
    ? { [`${currentDate}`]: speakItStatistics[currentDate] }
    : { [`${currentDate}`]: 0 };
  currentDateStatistics[currentDate] += words.filter(el => el.isItAnswered).length;

  dispatch(setSpeakItStatistics(currentDateStatistics));
  dispatch(updateCommonStatistics({ setIsRedirectToLoginPage, controller: new AbortController() }));
};
