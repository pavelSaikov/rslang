import { setSavannaStatistics } from './Savanna.actions';

export const savannaStatisticsReducer = (state = null, action) => {
  switch (action.type) {
    case setSavannaStatistics.type:
      return action.payload;
    default:
      return state;
  }
};
