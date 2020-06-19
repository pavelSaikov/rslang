import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  navigation: {
    width: '200px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#182F51',
  },
  navigationPage: {
    listStyle: 'none',
    paddingBottom: '75px',
  },
  navigationLink: {
    color: 'white',
    textDecoration: 'none',
  },
});
