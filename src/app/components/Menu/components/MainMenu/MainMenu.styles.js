import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  mainMenu: {
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    padding: '6px 60px',
    zIndex: '500',
    '@media (max-width: 700px)': {
      padding: '6px 10px',
    },
  },
});
