import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageWrapper: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#f7f2ee',
  },
  wrapperFlexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
    color: '#333366',
    '& h2': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  contentContainer: {
    flexGrow: 1,
    display: 'flex',
  },
  textContainer: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  imageContainer: {
    width: '100%',
    maxWidth: 500,
  },
  headerContainer: {
    margin: '25px 0',
    textAlign: 'center',
    color: '#333366',
  },
  formContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
