import { setUserDictionary, updateUserWord, addUserWord } from './UserDictionary.actions';

const DEFAULT_USER_DICTIONARY = [];
export const userDictionaryReducer = (state = DEFAULT_USER_DICTIONARY, action) => {
  switch (action.type) {
    case setUserDictionary.type:
      return action.payload;
    case updateUserWord.type:
      // eslint-disable-next-line no-case-declarations
      const wordsWithoutUpdates = state.filter(word => word.wordId !== action.payload.wordId);
      return [...wordsWithoutUpdates, action.payload];
    case addUserWord.type:
      return [...state, action.payload];
    default:
      return state;
  }
};
