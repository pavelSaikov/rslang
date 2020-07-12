import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  statisticsAfterGameWrapper: {
    width: '100%',
    height: '90%',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: '1',
    backgroundImage: 'linear-gradient(to bottom, #7d5daf, #c483a3)',
  },
  buttons: {
    padding: '10px 15px',
    fontSize: '15px',
    fontWeight: '600',
    borderRadius: '7px',
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#d9d9d9',
      cursor: 'pointer',
    },
  },
});
