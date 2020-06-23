import { GAME_MODE } from '../LearningPage.models';

export const createLearningPageConfig = ({ repeatableWordStatus = GAME_MODE.LEARNED_AND_NEW }) => ({
  repeatableWordStatus,
});
