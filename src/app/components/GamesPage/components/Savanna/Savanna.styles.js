import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  savanna: {
    width: '100%',
    minHeight: '100%',
  },
  gameHeader: {
    width: '90%',
    height: '10%',
    display: 'flex',
    marginTop: '30px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gameMain: {
    width: '100%',
    height: '90%',
    display: 'flex',
    marginTop: '250px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  timer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statisticsPage: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameWrapper: {
    width: '100%',
    minHeight: '100%',
    flexGrow: '1',
    background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(22,106,88,1) 0%, rgba(0,212,255,1) 100%)',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@media (max-width: 1000px)': {
    gameHeader: {
      justifyContent: 'space-around',
    },
  },
});
