import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  buttonsWrapper: {
    margin: '10px 0 40px 0',
    display: 'flex',
    justifyContent: 'space-evenly',
    outline: 'none',
    width: '100%',
  },
  buttonTrue: {
    padding: '10px 23px',
    fontSize: '15px',
    fontWeight: '600',
    borderRadius: '7px',
    backgroundColor: '#8fce83',
    '&:hover': {
      backgroundColor: '#75c166',
      cursor: 'pointer',
    },
  },
  buttonFalse: {
    padding: '10px 15px',
    fontSize: '15px',
    fontWeight: '600',
    borderRadius: '7px',
    backgroundColor: '#ff9494',
    '&:hover': {
      backgroundColor: '#ef7e7e',
      cursor: 'pointer',
    },
  },
  button: {
    padding: '10px',
    fontSize: '15px',
    fontWeight: '600',
    borderRadius: '7px',
    backgroundColor: '#224679',
    maxWidth: '200px',
    margin: '5px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2257a2',
      cursor: 'pointer',
    },
  },
});
