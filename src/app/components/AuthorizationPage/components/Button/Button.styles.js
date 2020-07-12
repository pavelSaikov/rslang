import { createUseStyles } from 'react-jss';

const INPUT_HEIGHT = 50;
const FONT_SIZE = 16;
const MARGIN_NUM = 0;

export const useStyles = createUseStyles({
  btn: {
    padding: '0 10px',
    minWidth: 130,
    height: INPUT_HEIGHT,
    textAlign: 'center',
    border: 'none',
    borderRadius: '10px',
    background: '#333366',
    color: 'white',
    margin: MARGIN_NUM,
    fontSize: FONT_SIZE,
    '&:focus': {
      outline: 0,
    },
    '&:hover': {
      backgroundColor: '#709EF7',
    },
  },
  mark: {
    position: 'relative',
    top: `-${INPUT_HEIGHT / 2 + FONT_SIZE / 2 + MARGIN_NUM}px`,
    left: '250px',
  },
});
