import { setSprintStatistics } from './SprintStatistics.action';

export const sprintStatisticsReducer = (state = null, action) => {
  switch (action.type) {
    case setSprintStatistics.type:
      return { ...action.payload };
    default:
      return state;
  }
};
