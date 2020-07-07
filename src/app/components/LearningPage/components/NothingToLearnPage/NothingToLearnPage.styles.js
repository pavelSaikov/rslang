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
  },
  imageContainer: {
    width: '90%',
    maxWidth: 512,
    marginTop: 50,
  },
  headerContainer: {
    margin: '25px 0',
    textAlign: 'center',
    fontWeight: 600,
  },
  button: {
    color: 'white',
    background: '#333366',
  },
});
