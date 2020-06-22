import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wordStatusChoicer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 230,
    padding: '10px 20px',
  },
});
