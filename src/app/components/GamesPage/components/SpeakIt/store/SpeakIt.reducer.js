import { setCurrentSetOfWords, setSpeakItStatistics, setActiveWord, setRightAnswers } from './SpeakIt.action';

const DEFAULT = { words: [], activeWord: null, rightAnswers: [], dayStatistics: null };

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

export const speakItStatisticsReducer = (state = null, action) => {
  switch (action.type) {
    case setSpeakItStatistics.type:
      return action.payload;
    default:
      return state;
  }
};
