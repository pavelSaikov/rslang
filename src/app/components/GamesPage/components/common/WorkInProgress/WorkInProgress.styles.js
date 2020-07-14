import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageContainer: {
    minHeight: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#f7f2ee',
  },
  contentContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    padding: '20px',
  },
  imageContainer: {
    width: '100%',
    maxWidth: 400,
  },
  headerContainer: {
    marginTop: 20,
    textAlign: 'center',
  },
});
