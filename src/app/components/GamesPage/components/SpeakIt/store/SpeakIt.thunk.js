import { wordsService } from '../../../../../services/WordsService/WordsService';
import { setCurrentSetOfWords } from './SpeakIt.action';
import { addError, resetErrors } from '../../../../errors/store/Errors.actions';

export const getArrayOfWords = ({ setGame, isUserWordsChosen, userDictionary }) => dispatch => {
  dispatch(resetErrors());

  if (isUserWordsChosen) {
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
