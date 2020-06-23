import { setLastLearnedWord, setLastVisiting, setCommonStatistics } from './CommonStatistics.action';
import { createCommonStatistics } from './create-common-statistics';

export const commonStatisticsReducer = (state = null, action) => {
  switch (action.type) {
    case setLastLearnedWord.type:
      return createCommonStatistics({ ...state, lastLearnedWord: action.payload });
    case setLastVisiting.type:
      return createCommonStatistics({ ...state, lastVisiting: action.payload });
    case setCommonStatistics.type:
      return createCommonStatistics({ ...action.payload });
    default:
      return state;
  }
};
