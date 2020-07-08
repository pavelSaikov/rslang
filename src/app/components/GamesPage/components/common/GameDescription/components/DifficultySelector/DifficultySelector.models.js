export const LEVEL = {
  VERY_EASY: 'very easy',
  EASY: 'easy',
  MEDIUM: 'medium',
  HARDER_THAN_AVERAGE: 'harder than average',
  HARD: 'hard',
  VERY_HARD: 'very hard',
};

export const LEVELS = Object.keys(LEVEL).map(key => LEVEL[key]);

export const LEVEL_PAGE_GROUP_MAP = new Map([
  [LEVEL.VERY_EASY, 0],
  [LEVEL.EASY, 1],
  [LEVEL.MEDIUM, 2],
  [LEVEL.HARDER_THAN_AVERAGE, 3],
  [LEVEL.HARD, 4],
  [LEVEL.VERY_HARD, 5],
]);
