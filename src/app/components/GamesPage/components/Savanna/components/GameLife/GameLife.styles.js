import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  gameLife: {
    '& i:nth-of-type(1)': {
      color: ({ countWrongAnswers }) => (countWrongAnswers >= 1 ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, 1)'),
    },
    '& i:nth-of-type(2)': {
      color: ({ countWrongAnswers }) => (countWrongAnswers >= 2 ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, 1)'),
    },
    '& i:nth-of-type(3)': {
      color: ({ countWrongAnswers }) => (countWrongAnswers >= 3 ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, 1)'),
    },
    '& i:nth-of-type(4)': {
      color: ({ countWrongAnswers }) => (countWrongAnswers >= 4 ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, 1)'),
    },
    '& i:nth-of-type(5)': {
      color: ({ countWrongAnswers }) => (countWrongAnswers >= 5 ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, 1)'),
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lifePoint: {
    fontSize: '20px',
    margin: '3px',
  },
  close: {
    marginLeft: '30px',
    width: '60px',
    fontSize: '30px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
  },
});
