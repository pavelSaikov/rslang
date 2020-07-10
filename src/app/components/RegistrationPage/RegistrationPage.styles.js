import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageWrapper: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#f7f2ee',
  },
  header: {
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
    display: 'flex',
    flexGrow: 1,
  },
  descriptionContainer: {
    width: '50%',
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 850px)': {
      display: 'none',
    },
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    paddingLeft: 10,
    color: '#407194',
    fontWeight: 600,
  },
  programNameContainer: {
    marginBottom: 50,
    color: '#333366',
  },
  imageContainer: {
    width: '100%',
    maxWidth: 400,
  },
  headerContainer: {
    margin: '25px 0',
    textAlign: 'center',
    color: '#333366',
  },
  listHeader: {
    width: '100%',
    marginBottom: 5,
  },
  registrationFormContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
