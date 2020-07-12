import { setAudioChallengeStatistics } from './AudioChallenge.action';

export const audioChallengeStatisticsReducer = (state = null, action) => {
  switch (action.type) {
    case setAudioChallengeStatistics.type:
      return { ...action.payload };
    default:
      return state;
  }
};
