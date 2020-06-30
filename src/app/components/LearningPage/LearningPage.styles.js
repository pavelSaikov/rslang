import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  gamePageContainer: {
    background: '#f7f2ee',
  },
  wrapper: {
    width: '100%',
    padding: '50px 4% 0 4%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
});
