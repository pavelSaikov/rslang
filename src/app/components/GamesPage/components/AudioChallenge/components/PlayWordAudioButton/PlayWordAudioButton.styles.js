import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  playWordAudioButton: {
    width: 150,
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    opacity: '0.2',
    marginTop: 100,
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.1',
    },
  },
});
