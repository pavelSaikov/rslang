export const wordsParse = (words, correctWord) => {
  const dictionary = correctWord ? correctWord.slice() : undefined;
  const wordsForAllRound = [];
  const wordsForSingleRound = [];
  const correctAnswers = [];
  words.map((wordObj, wordObjIndex) => {
    wordsForSingleRound.push(Object.assign({}, wordObj));

    if (!correctWord && (wordObjIndex + 1) % 5 === 0) {
      const randomNum = Math.floor(Math.random() * 5);
      correctAnswers.push(Object.assign({}, wordsForSingleRound[randomNum]));
      wordsForAllRound.push(wordsForSingleRound.slice());
      wordsForSingleRound.length = 0;
    }

    if (correctWord && (wordObjIndex + 1) % 4 === 0) {
      const correctAnswer = dictionary.shift();
      correctWord && wordsForSingleRound.push(Object.assign({}, correctAnswer));
      wordsForSingleRound.sort(() => 0.5 - Math.random());
      wordsForAllRound.push(wordsForSingleRound.slice());
      wordsForSingleRound.length = 0;
    }
  });
  return { wordsForAllRound, correctAnswers };
};
