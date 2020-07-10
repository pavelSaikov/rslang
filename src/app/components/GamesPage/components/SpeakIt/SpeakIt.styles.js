import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  box: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  words: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttons: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  btn: { transform: 'scale(1)' },

  '@media screen and (min-width: 320px) and (max-width: 604px)': {
    box: {
      height: '190%',
    },
    words: {
      justifyContent: 'center',
    },
    buttons: {
      display: 'block',
    },
    btn: {
      display: 'flex',
      justifyContent: 'center',
      transform: 'scale(1.5)',
      margin: '35px auto',
    },
  },
});
