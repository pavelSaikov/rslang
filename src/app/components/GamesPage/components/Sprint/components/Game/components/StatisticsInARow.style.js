import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  statisticsWrapper: {
    margin: '25px 0 30px 0',
    fontSize: '15px',
  },
  multiplyMessage: {
    margin: '10px 0',
  },
  marksWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '30px',
  },
  correctAnswerCircle: {
    width: '25px',
    height: '25px',
    backgroundColor: '#6f9c67',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerCircle: {
    width: '25px',
    height: '25px',
    backgroundColor: '#b8c1de',
    borderRadius: '50%',
  },
});
