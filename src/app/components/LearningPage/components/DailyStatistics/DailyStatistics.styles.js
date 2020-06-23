import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  statisticsCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerContainer: {
    padding: '20px 10px',
    textAlign: 'center',
  },
  statisticsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  statisticsItem: {
    display: 'flex',
    padding: '10px 0',
    borderBottom: '1px solid black',
  },
  statisticsSentence: {
    flexGrow: 1,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
  },
});
