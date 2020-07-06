import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  listElement: {
    marginRight: '70px',
    color: 'white',
    padding: '0 10px 0 10px',
    cursor: 'pointer',
    backgroundColor: ({ isClicked, isCorrect, userAnswer }) => {
      if (isClicked && isCorrect && userAnswer) {
        return 'rgba(9, 158, 42, 0.3)';
      }
      if (!isClicked && isCorrect && userAnswer) {
        return 'rgba(9, 158, 42, 0.3)';
      }
      if (isClicked && !isCorrect && userAnswer) {
        return 'rgba(232, 19, 43, 0.5)';
      }
      return 'rgba(255, 255, 255, 0)';
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .1)',
      cursor: 'pointer',
    },
  },
});
