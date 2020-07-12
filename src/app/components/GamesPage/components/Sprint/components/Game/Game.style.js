import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  springWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameWrapper: {
    width: '100%',
    maxWidth: '600px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  gameHeader: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5%',
  },
  gameMain: {
    width: '95%',
    border: '2px solid white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 10px',
    borderRadius: '10px',
    color: '#f1f1f1',
  },
  correctAnswer: {
    borderColor: '#6f9c67',
    boxShadow: '0 0 30px 8px #75cc64, inset 0 0 20px 2px #6f9c67',
  },
  incorrectAnswer: {
    borderColor: '#ff9494',
    boxShadow: '0 0 30px 8px #ef6767, inset 0 0 20px 2px #ff9494',
  },
  close: {
    width: '60px',
    fontSize: '35px',
    fontWeight: 'bold',
    color: 'white',
  },
});
