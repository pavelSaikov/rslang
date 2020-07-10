import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  mark: {
    display: 'inline',
    fontSize: 30,
    position: 'relative',
    top: '13px',
    left: '10px',
    color: 'gold',
    '&:hover': {
      textShadow: '2px 2px 2px yellow',
    },
  },
  transparent: {
    color: 'transparent',
    '&:hover': {
      textShadow: 'none',
    },
  },
});
