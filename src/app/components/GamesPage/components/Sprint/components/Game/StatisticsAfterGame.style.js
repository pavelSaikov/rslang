import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  statisticsWrapper: {
    width: '100%',
    maxWidth: '600px',
    maxHeight: '500px',
    height: '100%',
    backgroundColor: 'white',
    color: '#737373',
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '10px',
    margin: '10px',
    flexDirection: 'column',
    boxShadow: '0px 0px 6px 4px #e1e0de',
  },
  scroll: {
    width: '80%',
    height: '90%',
    overflowY: 'scroll',
    margin: '25px 0 10px 0',
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
      backgroundColor: '#e8e7e7',
    },
    '&::-webkit-scrollbar': {
      width: '12px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: '#23477b',
    },
    '@media (max-width: 550px)': {
      width: '95%',
    },
  },
  answerWrapper: {
    margin: '5px 0 20px 0',
  },
  correctAnswerTitle: {
    color: 'green',
    margin: '15px 0 10px 0',
  },
  incorrectAnswerTitle: {
    color: 'red',
    margin: '15px 0 10px 0',
  },
  buttonsWrapper: {
    width: '100%',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
    },
  },
  scoreStyle: {
    marginTop: '10px',
    fontSize: '25px',
    color: '#224679',
  },
});
