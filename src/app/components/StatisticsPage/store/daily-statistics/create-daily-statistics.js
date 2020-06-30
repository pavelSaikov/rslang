export const createDailyStatistics = ({
  repeatedWordsId = [],
  learnedWordsId = [],
  mistakesNumber = 0,
  maxSeriesLength = 0,
  cardsCounter = 0,
  isWasShownCardsStatistics = false,
  isWasShownNewWordsStatistics = false,
}) => ({
  repeatedWordsId,
  learnedWordsId,
  mistakesNumber,
  maxSeriesLength,
  cardsCounter,
  isWasShownCardsStatistics,
  isWasShownNewWordsStatistics,
});
