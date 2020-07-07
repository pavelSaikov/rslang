import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  mark: {
    display: 'inline',
    fontSize: 30,
    position: 'relative',
    top: '13px',
    left: '10px',
    color: '#407DF4',
    '&:hover': {
      textShadow: '2px 2px 2px #709EF7',
    },
  },
  answered: {
    color: 'green',
  },
});
