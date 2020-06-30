import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  progressPart: {
    width: '100%',
    height: '100%',
    backgroundColor: '#c0dbdf',
    '&.first': {
      borderRadius: '5px 0 0 5px',
    },
    '&.last': {
      borderRadius: '0 5px 5px 0',
    },
    '&.filled': {
      background: '#438c9a',
    },
  },
});
