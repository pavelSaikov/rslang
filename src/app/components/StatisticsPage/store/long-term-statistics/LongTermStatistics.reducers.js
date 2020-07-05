import { setLongTermStatistics, addDayStatistics } from './LongTermStatistics.actions';

export const longTermStatisticsReducer = (state = null, action) => {
  switch (action.type) {
    case setLongTermStatistics.type:
      return action.payload;
    case addDayStatistics.type:
      return [...state, action.payload];
    default:
      return state;
  }
};
