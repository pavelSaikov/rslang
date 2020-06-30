import {
  WORDS_PER_PAGE,
  DEFAULT_WORDS_PER_PAGE,
  DEFAULT_PAGES_IN_EACH_GROUP,
  DEFAULT_GROUPS_NUMBER,
} from './WordsService.models';
import { ENDPOINT } from '../services.models';

export class WordsService {
  constructor() {
    this.endpoint = ENDPOINT;
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
      body: JSON.stringify({ difficulty: 'not defined', optional: wordPayload }),
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
      body: JSON.stringify({ difficulty: 'not defined', optional: wordPayload }),
    }).then(response => response.json());
  }

  getPagesNumberInGroupLimitedWordsPerExampleSentence({
    groupNumber,
    wordPerExampleSentenceLTE = 10,
    wordsPerPage = 10,
  }) {
    const searchParams = new URLSearchParams([
      ['group', groupNumber],
      ['wordsPerExampleSentenceLTE', wordPerExampleSentenceLTE],
      ['wordsPerPage', wordsPerPage],
    ]);

    return fetch(`${this.endpoint}/words/count?${searchParams}`)
      .then(response => response.json())
      .then(({ count }) => count);
  }

  getWordsFromGroupAndPageLimitedWordsPerExampleSentence({
    groupNumber,
    pageNumber,
    wordPerExampleSentenceLTE = 10,
    wordsPerPage = 10,
  }) {
    const searchParams = new URLSearchParams([
      ['group', groupNumber],
      ['page', pageNumber],
      ['wordsPerExampleSentenceLTE', wordPerExampleSentenceLTE],
      ['wordsPerPage', wordsPerPage],
    ]);

    return fetch(`${this.endpoint}/words?${searchParams}`).then(response => response.json());
  }

  getWordsNumberInGroup({ groupNumber }) {
    const searchParams = new URLSearchParams([['group', groupNumber]]);

    return fetch(`${this.endpoint}/words/count?${searchParams}`)
      .then(response => response.json())
      .then(({ count }) => count);
  }

  getWordsFromGroupAndPage({ groupNumber, pageNumber }) {
    const searchParams = new URLSearchParams([
      ['group', groupNumber],
      ['page', pageNumber],
    ]);

    return fetch(`${this.endpoint}/words?${searchParams}`).then(response => response.json());
  }

  calculateNextWordPosition({ group, page, index }) {
    const indexNextWord = index === DEFAULT_WORDS_PER_PAGE - 1 ? 0 : index + 1;
    const pageNextWord = indexNextWord ? (page === DEFAULT_PAGES_IN_EACH_GROUP - 1 ? 0 : page + 1) : page;
    const groupNextWord = pageNextWord ? group : group + 1;

    if (groupNextWord >= DEFAULT_GROUPS_NUMBER) {
      return;
    }

    return { group: groupNextWord, page: pageNextWord, index: indexNextWord };
  }

  getWordByPosition({ group, page, index }) {
    if (group >= DEFAULT_GROUPS_NUMBER || page >= DEFAULT_PAGES_IN_EACH_GROUP || index >= DEFAULT_WORDS_PER_PAGE) {
      return Promise.resolve();
    }

    return this.getWordsFromGroupAndPage({
      groupNumber: group,
      pageNumber: page,
    })
      .then(words => words[index])
      .then(wordInfo => ({
        ...wordInfo,
        audio: `${this.githubEndpoint}${wordInfo.audio}`,
        image: `${this.githubEndpoint}${wordInfo.image}`,
        audioMeaning: `${this.githubEndpoint}${wordInfo.audioMeaning}`,
        audioExample: `${this.githubEndpoint}${wordInfo.audioExample}`,
      }));
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
        audioMeaning: `${this.githubEndpoint}${wordInfo.audioMeaning}`,
        audioExample: `${this.githubEndpoint}${wordInfo.audioExample}`,
      }));
  }

  removeAllUserWord({ token, userId }) {
    return this.getAllUserWords({ token, userId }).then(words =>
      Promise.all(
        words.map(word =>
          fetch(`${this.endpoint}/users/${userId}/words/${word.wordId}`, {
            method: 'DELETE',
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }),
        ),
      ),
    );
  }
}

export const wordsService = new WordsService();
