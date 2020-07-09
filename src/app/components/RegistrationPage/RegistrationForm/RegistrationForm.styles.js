import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wrapper: {
    width: 300,
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '2px 2px 20px grey',
    background: 'white',
    '@media (max-width: 400px)': {
      width: 250,
    },
    '@media (max-width: 340px)': {
      width: 210,
    },
  },
});
