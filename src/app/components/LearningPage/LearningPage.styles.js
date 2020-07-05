import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    fontSize: 18,
  },
  gamePageContainer: {
    background: '#f7f2ee',
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
  componentsContainer: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
  },
  learningInfoContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  settingsContainer: {
    margin: '0 50px',
  },
  ghostContainer: {
    flexGrow: 1,
  },
  statisticsWrapper: {
    minHeight: '100%',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endGameContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    fontSize: 18,
  },
  endGameButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '300px',
    padding: '20px 0',
  },
  buttonStyle: {
    color: '#333366',
    boxShadow: '2px 2px 3px 2px #e1e0de',
  },
});
