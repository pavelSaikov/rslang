import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  background: {
    position: 'absolute',
    left: '40vw',
    top: '50px',
    zIndex: '-100',
    height: '90vh',
  },
  wrapperFlexRow: {
    width: '90vw',
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    margin: '20px 3vw',
  },
  formContainer: {
    position: 'relative',
    zIndex: '10',
  },
});
