import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wordStatusChoicer: {
    marginTop: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    background: 'white',
    borderRadius: 5,
    boxShadow: '0px 0px 6px 4px #e1e0de',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 310,
    padding: '10px 20px',
    boxSizing: 'border-box',
    '@media (max-width: 380px)': {
      width: 200,
      flexDirection: 'column',
    },
  },
  button: {
    boxShadow: '2px 2px 3px 2px #e1e0de',
    background: '#f5f5f5',
    '@media (max-width: 380px)': {
      marginTop: 15,
    },
  },
});
