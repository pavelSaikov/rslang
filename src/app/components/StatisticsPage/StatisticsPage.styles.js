import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    fontSize: 18,
    '@media (max-width: 600px)': {
      fontSize: 15,
    },
  },
  componentsWrapper: {
    width: '100%',
    padding: '50px 2% 0 2%',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    flexDirection: 'column',
    boxSizing: 'border-box',
    background: '#f7f2ee',
  },
  dailyStatisticsContainer: {
    padding: 20,
    boxSizing: 'border-box',
    borderRadius: 10,
    background: 'white',
    boxShadow: '0px 0px 6px 4px #e1e0de',
  },
  headerDailyStatistics: {
    textAlign: 'center',
    marginBottom: 20,
  },
  progressStripContainer: {
    width: 600,
    marginBottom: 35,
    borderBottom: '2px solid #f0eae6',
    '@media (max-width: 700px)': {
      width: 500,
    },
    '@media (max-width: 600px)': {
      width: 400,
    },
    '@media (max-width: 500px)': {
      width: 330,
    },
    '@media (max-width: 400px)': {
      width: 250,
    },
  },
  progressStripHeader: {
    paddingBottom: 10,
  },
  numericStatisticsContainer: {
    marginBottom: 15,
    borderBottom: '2px solid #f0eae6',
  },
  percentCorrectAnswersContainer: {
    color: '#99cc99',
  },
  maxSeriesLengthContainer: {
    color: '#333366',
  },
  chartContainer: {
    width: '100%',
    maxWidth: 1200,
    marginTop: 40,
    padding: 20,
    borderRadius: 10,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    boxShadow: '0px 0px 6px 4px #e1e0de',
    '@media (max-width: 1400px)': {
      width: 1000,
    },
    '@media (max-width: 1250px)': {
      width: 850,
    },
    '@media (max-width: 1000px)': {
      width: 700,
    },
    '@media (max-width: 870px)': {
      width: 640,
    },
    '@media (max-width: 700px)': {
      width: 540,
    },
    '@media (max-width: 600px)': {
      width: 440,
    },
    '@media (max-width: 500px)': {
      width: 370,
    },
    '@media (max-width: 400px)': {
      width: 290,
    },
  },
  chartHeader: {
    color: '#333366',
    paddingBottom: 20,
  },
});
