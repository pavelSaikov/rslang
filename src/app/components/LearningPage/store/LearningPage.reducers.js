import { setLearningPageConfig } from './LearningPage.actions';
import { createLearningPageConfig } from './create-learning-page-config';

export const learningPageConfigReducer = (state = createLearningPageConfig({}), action) => {
  switch (action.type) {
    case setLearningPageConfig.type:
      return action.payload;
    default:
      return state;
  }
};
