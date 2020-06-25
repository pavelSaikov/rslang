import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wrapperFlexRow: {
    position: 'relative',
    left: '60vw',
    width: '360px',
  },
  wrapperFlexColumn: {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapper: {
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '2px 2px 20px grey',
    backgroundColor: 'white',
  },
});
