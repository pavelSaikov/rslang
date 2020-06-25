import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  error: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    height: 70,
    padding: '0 10px',
    marginBottom: 5,
    border: '.5px solid rgba(255, 0, 0, 0.4)',
    backgroundColor: 'rgba(76, 82, 85, 0.4)',
    '&:hover': {
      backgroundColor: 'rgba(76, 82, 85, 0.8)',
      '& $crossButton': {
        visibility: 'visible',
        cursor: 'pointer',
      },
    },
  },
  crossButton: {
    visibility: 'hidden',
  },
});
