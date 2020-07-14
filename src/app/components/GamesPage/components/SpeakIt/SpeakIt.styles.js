import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  mainContainer: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    minHeight: '100%',
    background: '#f7f2ee',
  },
  box: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  words: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttons: {
    width: '80%',
    maxWidth: 500,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '50px',
    '@media (max-width: 540px)': {
      flexDirection: 'column',
      marginTop: '10px',
    },
  },
  btn: { transform: 'scale(1)' },
  statisticsAfterGameWrapper: {
    width: '100%',
    minHeight: '100%',
    padding: '10px 30px',
    boxSizing: 'border-box',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f7f2ee',
  },
  exitButton: {
    position: 'absolute',
    right: 30,
    top: 15,
  },
  '@media (max-width: 604px)': {
    mainContainer: {
      height: '190%',
    },
    box: {
      height: '190%',
    },
    words: {
      justifyContent: 'center',
    },
    btn: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px auto',
    },
  },
});
