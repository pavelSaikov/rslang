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
    color: '#333366',
  },
  statisticsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  statisticsItem: {
    display: 'flex',
    padding: '10px 0',
    borderBottom: '1px solid #f0eae6',
  },
  statisticsSentence: {
    marginRight: 30,
    flexGrow: 1,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
  },
  cardsCompleted: {
    color: '#339999',
  },
  correctAnswers: {
    color: '#99cc99',
  },
  newWords: {
    color: '#ff9966',
  },
  seriesLength: {
    color: '#333366',
  },
  button: {
    color: '333366',
    boxShadow: '2px 2px 3px 2px #e1e0de',
  },
});
