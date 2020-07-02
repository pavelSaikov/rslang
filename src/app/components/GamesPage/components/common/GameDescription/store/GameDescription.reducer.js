import { setLevel } from './GameDescription.action';

const DEFAULT_LEVEL = {
  level: 'easy',
};

export const gameDescriptionReducer = (state = DEFAULT_LEVEL, action) => {
  switch (action.type) {
    case setLevel.type:
      return action.payload || null;
    default:
      return state;
  }
};
