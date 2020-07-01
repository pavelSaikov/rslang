import { createAction } from '../../../../store/create-action';

export const setDailyStatistics = createAction('[Daily Statistics] Set Daily Statistics');
export const setRepeatedWordsId = createAction('[Daily Statistics] Set Repeated Words Identifiers');
export const setLearnedWordsId = createAction('[Daily Statistics] Set Learned Words Identifiers');
export const setMistakesNumber = createAction('[Daily Statistics] Set Mistakes Number');
export const setMaxSeriesLength = createAction('[Daily Statistics] Set Max Series Length');
export const setCardsCounter = createAction('[Daily Statistics] Set Cards Counter');
export const setIsWasShownCardsStatistics = createAction('[Daily Statistics] Set Is Was Shown Statistics About Cards');
export const setIsWasShownNewWordsStatistics = createAction(
  '[Daily Statistics] Set Is Was Show Statistics About New Words',
);
