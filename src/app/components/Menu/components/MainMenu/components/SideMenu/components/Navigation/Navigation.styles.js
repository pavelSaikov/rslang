import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  navigationList: {
    width: '100%',
    display: 'flex',
    minHeight: '80vh',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  navigationLink: {
    width: '100%',
    color: 'white',
    textDecoration: 'none',
    fontSize: '10px',
    marginLeft: '70px',
    overflow: 'hidden',
    padding: '15px',
    listStyle: 'none',
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: '#001F4B',
      borderRadius: '50px 0 0 50px',
    },
  },
  navigationIcon: {
    paddingRight: '20px',
  },
});
