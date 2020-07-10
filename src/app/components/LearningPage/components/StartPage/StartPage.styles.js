import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageWrapper: {
    color: '#333366',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    fontSize: 18,
  },
  contentContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f7f2ee',
    padding: '0 10px',
  },
  imageContainer: {
    width: '90%',
    maxWidth: 512,
    '@media (max-width: 800px)': {
      width: '70%',
    },
    '@media (max-width: 660px)': {
      marginTop: 40,
    },
  },
  headerContainer: {
    fontWeight: 600,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 600,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 660px)': {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  pickerContainer: {
    display: 'flex',
    '@media (max-width: 660px)': {
      marginTop: 18,
    },
  },
  startButton: {
    background: '#f5f5f5',
    width: 210,
    fontWeight: 600,
    boxShadow: '2px 2px 3px 2px #e1e0de',
  },
});
