import {
  setRepeatedWordsId,
  setLearnedWordsId,
  setMistakesNumber,
  setMaxSeriesLength,
  setDailyStatistics,
  setCardsCounter,
  setIsWasShownCardsStatistics,
  setIsWasShownNewWordsStatistics,
} from './DailyStatistics.actions';
import { createDailyStatistics } from './create-daily-statistics';

export const dailyStatisticsReducer = (state = null, action) => {
  switch (action.type) {
    case setDailyStatistics.type:
      return createDailyStatistics({ ...action.payload });
    case setRepeatedWordsId.type:
      return createDailyStatistics({ ...state, repeatedWordsId: action.payload });
    case setLearnedWordsId.type:
      return createDailyStatistics({ ...state, learnedWordsId: action.payload });
    case setMistakesNumber.type:
      return createDailyStatistics({ ...state, mistakesNumber: action.payload });
    case setMaxSeriesLength.type:
      return createDailyStatistics({ ...state, maxSeriesLength: action.payload });
    case setCardsCounter.type:
      return createDailyStatistics({ ...state, cardsCounter: action.payload });
    case setIsWasShownCardsStatistics.type:
      return createDailyStatistics({ ...state, isWasShownCardsStatistics: action.payload });
    case setIsWasShownNewWordsStatistics.type:
      return createDailyStatistics({ ...state, isWasShownNewWordsStatistics: action.payload });
    default:
      return state;
  }
};
