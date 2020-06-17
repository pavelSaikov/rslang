import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  dictionaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1100,
  },
  wordStatusesContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px 0',
  },
  wordsGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});
