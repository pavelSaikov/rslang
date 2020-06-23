import { createUseStyles } from 'react-jss';
import { GAME_STATUS } from './../../AudioChallenge.models';

export const useStyles = createUseStyles({
  listOfAnswers: {
    display: 'flex',
    marginTop: 50,
    listStyleType: 'none',
    fontSize: '20px',
    lineHeight: '45px',
  },
  answer: {
    color: gameStatus => {
      if (gameStatus === GAME_STATUS.CHOICE) {
        return 'rgba(255, 255, 255, 1)';
      } else if (gameStatus === GAME_STATUS.IS_CORRECT || gameStatus === GAME_STATUS.IS_INCORRECT) {
        return 'rgba(255, 255, 255, .4)';
      }
    },
    cursor: gameStatus => gameStatus === GAME_STATUS.CHOICE && 'pointer',
    padding: '0 20px 0 20px',
    '&:hover': {
      backgroundColor: gameStatus => gameStatus === GAME_STATUS.CHOICE && 'rgba(255, 255, 255, .1)',
    },
  },

  active: {
    backgroundColor: 'rgba(255, 255, 255, .1)',
  },

  incorrectAnswer: {
    textDecoration: 'line-through',
  },

  correctAnswer: {
    textDecoration: 'underline',
    color: 'rgba(255, 255, 255, 1) !important',
  },
});
