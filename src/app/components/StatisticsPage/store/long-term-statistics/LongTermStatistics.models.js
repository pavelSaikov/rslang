export const createLongTermStatistics = ({ longTermStatistics = [] }) => longTermStatistics;

export const createLongTermStatisticsItem = ({
  dailyStatistics: { learnedWordsId },
  commonStatistics: { lastVisiting },
}) => ({ newWordsCount: learnedWordsId.length, date: lastVisiting });
