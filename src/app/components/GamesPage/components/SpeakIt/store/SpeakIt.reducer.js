import { setCurrentSetOfWords } from './SpeakIt.action';
import { setActiveWord } from './SpeakIt.action';
import { setRightAnswers } from './SpeakIt.action';

const DEFAULT = { words: [], activeWord: null, rightAnswers: [] };

export const speakItReducer = (state = DEFAULT, action) => {
  switch (action.type) {
    case setCurrentSetOfWords.type:
      return { ...state, words: action.payload };
    case setActiveWord.type:
      return { ...state, activeWord: action.payload };
    case setRightAnswers.type:
      return { ...state, rightAnswers: action.payload };
    default:
      return state;
  }
};
