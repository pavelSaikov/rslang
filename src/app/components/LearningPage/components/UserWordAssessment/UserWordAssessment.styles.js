import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  userWordAssessment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 550,
    borderRadius: 5,
    border: '1px solid black',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '100%',
    padding: '10px 20px',
  },
});
