import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    fontSize: 18,
  },
  componentsWrapper: {
    width: '100%',
    padding: '50px 4% 0 4%',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    flexDirection: 'column',
    boxSizing: 'border-box',
    background: '#f7f2ee',
  },
  dailyStatisticsContainer: {
    padding: 20,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    boxShadow: '0px 0px 6px 4px #e1e0de',
  },
  chartHeader: {
    color: '#333366',
    paddingBottom: 20,
  },
});
