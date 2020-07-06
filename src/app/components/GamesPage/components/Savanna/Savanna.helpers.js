import { wordsService } from '../../../../services/WordsService/WordsService';
import { LEVEL_PAGE_GROUP_MAP } from '../common/GameDescription/components/DifficultySelector/DifficultySelector.models';
import { GAME_STATUS } from './Savanna.models';
import { WORD_STATUS } from '../../../DictionaryPage/DictionaryPage.models';

export const getGameWords = (level, isPlayWithUserWords, userDictionary) => {
  if (isPlayWithUserWords) {
    const filteredDictionary = userDictionary
      .filter(el => el.status === WORD_STATUS.LEARNED)
      .sort(() => Math.random() - 0.5)
      .slice(0, GAME_STATUS.COUNTROUND);

    return Promise.all(
      filteredDictionary.map(word => {
        return wordsService.getWordInfo({ wordId: word.wordId }).then(targetWord =>
          Promise.all([
            Promise.resolve(targetWord),
            wordsService.getRandomWordsFromGroup({
              groupNumber: LEVEL_PAGE_GROUP_MAP.get(level),
              wordsNumber: GAME_STATUS.WORDS_PER_ROUND,
              wordPerExampleSentenceLTE: GAME_STATUS.WORD_PER_EXAMPLE_SENTENCE_LTE,
            }),
          ]).then(([targetWord, randomWords]) => {
            const filteredRandomWords = randomWords
              .filter(el => el.wordTranslate !== targetWord.wordTranslate)
              .slice(0, GAME_STATUS.WORDS_PER_ROUND - 1);

            return {
              correctWord: {
                word: targetWord.word,
                translation: targetWord.wordTranslate,
                globalWordId: targetWord.id,
                wordAudio: targetWord.audio,
              },
              answers: [
                targetWord.wordTranslate,
                ...filteredRandomWords.map(({ wordTranslate }) => wordTranslate),
              ].sort(() => Math.random() - 0.5),
            };
          }),
        );
      }),
    );
  }

  return wordsService
    .getRandomWordsFromGroup({
      groupNumber: LEVEL_PAGE_GROUP_MAP.get(level),
      wordsNumber: GAME_STATUS.WORDS_NUMBER,
      wordPerExampleSentenceLTE: GAME_STATUS.WORD_PER_EXAMPLE_SENTENCE_LTE,
    })
    .then(words => {
      return words.reduce((acc, cur, index) => {
        if (index % GAME_STATUS.ROUND === 0) {
          acc.push({
            correctWord: {
              word: cur.word,
              translation: cur.wordTranslate,
              globalWordId: cur.id,
              wordAudio: cur.audio,
            },
            answers: [
              cur.wordTranslate,
              words[index + 1].wordTranslate,
              words[index + 2].wordTranslate,
              words[index + 3].wordTranslate,
            ].sort(() => Math.random() - 0.5),
          });
        }
        return acc;
      }, []);
    });
};
