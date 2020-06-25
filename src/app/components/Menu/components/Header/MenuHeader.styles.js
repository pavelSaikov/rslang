import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  header: {
    width: '200px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  },
  headerLink: {
    color: 'black',
    fontWeight: '900',
    textDecoration: 'none',
    fontSize: '30px',
  },
});
