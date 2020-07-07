export const wordsParse = words => {
  const wordsForAllRound = [];
  const wordsForSingleRound = [];
  words.map((wordObj, wordObjIndex) => {
    wordsForSingleRound.push(Object.assign({}, wordObj));
    if ((wordObjIndex + 1) % 5 === 0) {
      wordsForAllRound.push(wordsForSingleRound.slice());
      wordsForSingleRound.length = 0;
    }
  });
  return wordsForAllRound;
};
