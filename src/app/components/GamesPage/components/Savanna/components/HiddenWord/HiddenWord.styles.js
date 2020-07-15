import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  '@keyframes around': {
    from: {
      top: '200px',
    },
    to: {
      top: '600px',
    },
  },
  hiddenWord: {
    marginBottom: '100px',
    color: 'white',
    position: 'absolute',
    padding: '0 10px 0 10px',
    fontSize: '35px',
    animation: '$around 10s infinite linear',
  },
});
