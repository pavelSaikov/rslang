import { setLevel } from './GameDescription.action';
import { LEVEL } from '../components/DifficultySelector/DifficultySelector.models';

const DEFAULT_LEVEL = {
  level: LEVEL.EASY,
};

export const gameDescriptionReducer = (state = DEFAULT_LEVEL, action) => {
  switch (action.type) {
    case setLevel.type:
      return action.payload || null;
    default:
      return state;
  }
};
