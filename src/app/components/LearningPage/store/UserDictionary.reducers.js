import { setUserDictionary } from './UserDictionary.actions';

const DEFAULT_USER_DICTIONARY = [];
export const userDictionaryReducer = (state = DEFAULT_USER_DICTIONARY, action) => {
  switch (action.type) {
    case setUserDictionary.type:
      return action.payload;
    default:
      return state;
  }
};
