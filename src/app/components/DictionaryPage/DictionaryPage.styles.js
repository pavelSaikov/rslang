import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageContainer: {
    minHeight: '100%',
    background: '#f7f2ee',
  },
  dictionaryContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
    alignItems: 'center',
    boxSizing: 'border-box',
    '@media (max-width: 590px)': {
      fontSize: 15,
    },
  },
  header: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 1020px)': {
      flexDirection: 'column',
    },
  },
  repeatButtonContainer: {
    position: 'absolute',
    right: 40,
    '@media (max-width: 1020px)': {
      position: 'static',
    },
  },
  repeatButton: {
    color: 'white',
    background: '#1a3b71',
  },
  wordStatusesContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px 0',
    '@media (max-width: 550px)': {
      flexDirection: 'column',
    },
  },
  wordsGroupContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
