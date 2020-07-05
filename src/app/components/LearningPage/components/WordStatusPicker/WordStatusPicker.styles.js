import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wordStatusChoicer: {
    marginTop: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    borderRadius: 5,
    boxShadow: '0px 0px 6px 4px #e1e0de',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 230,
    padding: '10px 20px',
  },
  button: {
    boxShadow: '2px 2px 3px 2px #e1e0de',
    background: '#f5f5f5',
  },
});
