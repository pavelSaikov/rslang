import { createUseStyles } from 'react-jss';

import { GAME_STATUS } from './../../../AudioChallenge.models';

export const useStyles = createUseStyles({
  iconLearned: {
    display: gameStatus => gameStatus === GAME_STATUS.CHOICE && 'none',
    color: '#57fd02 !important',
  },
  incorrectAnswer: {
    textDecoration: 'line-through',
  },
  correctAnswer: {
    color: 'rgba(255, 255, 255, 1) !important',
  },
  answer: {
    color: gameStatus => (gameStatus === GAME_STATUS.CHOICE ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, .4)'),
    cursor: gameStatus => gameStatus === GAME_STATUS.CHOICE && 'pointer',
    padding: '0 20px 0 20px',
    '&:hover': {
      backgroundColor: gameStatus => gameStatus === GAME_STATUS.CHOICE && 'rgba(255, 255, 255, .1)',
    },
  },
});
