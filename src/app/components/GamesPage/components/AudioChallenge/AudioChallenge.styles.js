import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  audioChallenge: {
    display: 'flex',
    minHeight: '100%',
    flexGrow: '1',
    flexFlow: 'column',
    color: '#ffffff',
    backgroundImage: 'linear-gradient(to bottom, #7d5daf, #c483a3)',
    alignItems: 'center',
  },
  statisticsAfterGameWrapper: {
    width: '100%',
    display: 'flex',
    flexGrow: '1',
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to bottom, #7d5daf, #c483a3)',
  },
  gameDescriptionWrapper: {
    flexGrow: '1',
    minHeight: '100%',
    background: '#f7f2ee',
  },
  exitButton: {
    position: 'absolute',
    right: 30,
    top: 15,
  },
});
