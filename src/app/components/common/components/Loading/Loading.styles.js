import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageWrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    fontSize: 18,
    color: '#333366',
  },
  contentContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f7f2ee',
  },
  imageContainer: {
    width: '90%',
    maxWidth: 512,
    marginTop: 50,
    textAlign: 'center',
    background: '#f7f2ee',
  },
});
