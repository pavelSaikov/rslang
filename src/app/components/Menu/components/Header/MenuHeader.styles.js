import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  header: {
    width: '200px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001F4B',
  },
  headerLink: {
    color: 'white',
    fontWeight: '900',
    textDecoration: 'none',
  },
});
