import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  hiddenWord: {
    marginBottom: '100px',
    color: 'white',
    padding: '0 10px 0 10px',
    fontSize: '35px',
    transition: 'all 7s linear',
    '&:hover': {
      transform: 'translateY(400px)',
    },
  },
});
