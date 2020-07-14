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
    background: '#f7f2ee',
  },
  wrapperFlexRow: {
    width: '80vw',
    margin: '20px 10vw',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  wrapperFlexColumn: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapperFlexButton: {
    width: '700px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    alignItems: 'center',
    '@media screen and (min-width: 320px) and (max-width: 705px)': {
      width: '250px',
      height: '160px',
      margin: '20px auto',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  button: {
    padding: '10px !important',
    fontSize: '15px',
    fontWeight: '600',
    backgroundColor: '#224679',
    display: 'flex',
    color: 'white',
    height: 50,
    marginRight: '10px',
    textAlign: 'center',
    borderRadius: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#2257a2',
      cursor: 'pointer',
    },
    '@media screen and (min-width: 320px) and (max-width: 705px)': {
      marginBottom: '10px',
      marginRight: '0px',
    },
  },
});
