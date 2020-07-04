import { wordsService } from './../../../../../../app/services/WordsService/WordsService';
import { wordsParse } from './../wordsParse';
import { addError } from '../../../../errors/store/Errors.actions';

export const loadRandomWords = ({ setRoundsWords }) => dispatch => {
  wordsService
    .getRandomWordsFromGroup({ groupNumber: 5, wordsNumber: 50, wordPerExampleSentenceLTE: 20 })
    .then(words => {
      setRoundsWords(wordsParse(words));
    })
    .catch(e => {
      dispatch(addError(e.message));
    });
};
