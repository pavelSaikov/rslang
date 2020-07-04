import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  userWordAssessment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 550,
    margin: '20px 0',
    padding: 20,
    borderRadius: 5,
    background: 'white',
    boxShadow: '0px 0px 6px 4px #e1e0de',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '100%',
    padding: '10px 20px',
  },
  button: {
    boxShadow: '2px 2px 3px 2px #e1e0de',
    background: '#f5f5f5',
  },
});
