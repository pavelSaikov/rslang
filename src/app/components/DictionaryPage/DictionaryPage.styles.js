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
