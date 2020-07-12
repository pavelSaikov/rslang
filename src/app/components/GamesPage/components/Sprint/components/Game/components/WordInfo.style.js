import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wordInfoWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    flexWrap: 'wrap',
  },
  wordAudioStyle: {
    marginRight: '15px',
    cursor: 'pointer',
  },
  wordStyle: {
    marginRight: '15px',
    color: '#224679',
  },
  translationStyle: {
    marginLeft: '15px',
    marginRight: '15px',
  },
});
