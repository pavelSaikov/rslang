import { createUseStyles } from 'react-jss';

const FONT_SIZE = 14;

export const useStyles = createUseStyles({
  btnContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  iconForward: {
    color: 'white',
  },
  btn: {
    width: '100%',
    textAlign: 'left',
    border: 'none',
    borderRadius: '10px',
    background: '#333366',
    color: 'white',
    padding: '20px 20px',
    fontSize: FONT_SIZE,
    '&:focus': {
      outline: 0,
    },
  },
  mark: {
    display: 'inline',
    position: 'absolute',
    left: '85%',
  },
});
