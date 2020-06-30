export const createCommonStatistics = ({ lastLearnedWord: { group, page, index } }) => ({
  lastVisiting: Date.now(),
  lastLearnedWord: { group, page, index },
});
