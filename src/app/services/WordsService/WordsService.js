import { WORDS_PER_PAGE } from './WordsService.models';

export class WordsService {
  constructor() {
    this.endpoint = 'https://afternoon-falls-25894.herokuapp.com';
    this.githubEndpoint = 'https://raw.githubusercontent.com/pavelSaikov/rslang-data/master/';
  }

  getAllUserWords({ token, userId }) {
    return fetch(`${this.endpoint}/users/${userId}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(res =>
        res.map(({ optional }) => ({
          ...optional,
          lastRepetition: Number.parseInt(optional.lastRepetition),
          mistakesNumber: Number.parseInt(optional.mistakesNumber),
          repetitionNumber: Number.parseInt(optional.repetitionNumber),
          isRepeatedToday: false,
        })),
      );
  }

  addUserWord({ token, userId, wordId, wordPayload }) {
    return fetch(`${this.endpoint}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty: null, optional: wordPayload }),
    }).then(response => response.json());
  }

  updateUserWord({ token, userId, wordId, wordPayload }) {
    return fetch(`${this.endpoint}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty: null, optional: wordPayload }),
    }).then(response => response.json());
  }

  getPagesNumberInGroup({ groupNumber, wordPerExampleSentenceLTE = 10, wordsPerPage = 10 }) {
    const searchParams = new URLSearchParams([
      ['group', groupNumber],
      ['wordsPerExampleSentenceLTE', wordPerExampleSentenceLTE],
      ['wordsPerPage', wordsPerPage],
    ]);

    return fetch(`${this.endpoint}/words/count?${searchParams}`)
      .then(response => response.json())
      .then(({ count }) => count);
  }

  getWordsFromGroupAndPage({ groupNumber, pageNumber, wordPerExampleSentenceLTE = 10, wordsPerPage = 10 }) {
    const searchParams = new URLSearchParams([
      ['group', groupNumber],
      ['page', pageNumber],
      ['wordsPerExampleSentenceLTE', wordPerExampleSentenceLTE],
      ['wordsPerPage', wordsPerPage],
    ]);

    return fetch(`${this.endpoint}/words?${searchParams}`).then(response => response.json());
  }

  getRandomWordsFromGroup({ groupNumber, wordsNumber, wordPerExampleSentenceLTE }) {
    return this.getPagesNumberInGroup({ groupNumber, wordPerExampleSentenceLTE, WORDS_PER_PAGE })
      .then(pagesNumberInGroup => {
        const numberOfPagesForRequesting =
          wordsNumber % WORDS_PER_PAGE ? Math.floor(wordsNumber / WORDS_PER_PAGE) + 1 : wordsNumber / WORDS_PER_PAGE;

        const pagesNumbers = Array(numberOfPagesForRequesting)
          .fill(0, 0, numberOfPagesForRequesting)
          .reduce(res => {
            let pageIndex = Math.floor(Math.random() * pagesNumberInGroup);
            while (res.includes(pageIndex)) {
              pageIndex = Math.floor(Math.random() * pagesNumberInGroup);
            }

            res.push(pageIndex);

            return res;
          }, []);

        return Promise.all(
          pagesNumbers.map((pageNumber, index, arr) => {
            return this.getWordsFromGroupAndPage({
              groupNumber,
              pageNumber,
              wordPerExampleSentenceLTE,
              WORDS_PER_PAGE,
            }).then(words => {
              if (index === arr.length - 1 && wordsNumber % WORDS_PER_PAGE !== 0) {
                return words.slice(0, wordsNumber % WORDS_PER_PAGE);
              }

              return words;
            });
          }),
        );
      })
      .then(wordGroups => wordGroups.flat());
  }

  getWordInfo({ wordId }) {
    return fetch(`${this.endpoint}/words/${wordId}`)
      .then(response => response.json())
      .then(wordInfo => ({
        ...wordInfo,
        audio: `${this.githubEndpoint}${wordInfo.audio}`,
        image: `${this.githubEndpoint}${wordInfo.image}`,
      }));
  }
}

export const wordsService = new WordsService();
