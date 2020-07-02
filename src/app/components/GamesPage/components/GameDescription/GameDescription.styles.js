import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  header: {
    fontWeight: 600,
    fontSize: '20px',
  },
  container: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  wrapperFlexRow: {
    width: '80vw',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 10vw',
  },
  wrapperFlexColumn: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
