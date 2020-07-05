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
    alignItems: 'center',
  },
  header: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  repeatButtonContainer: {
    position: 'absolute',
    right: 40,
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
  },
  wordsGroupContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
