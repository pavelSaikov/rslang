import { createUseStyles } from 'react-jss';

const INPUT_HEIGHT = 50;
const FONT_SIZE = 14;
const MARGIN_NUM = 0;

export const useStyles = createUseStyles({
  btn: {
    width: '150px',
    height: INPUT_HEIGHT,
    textAlign: 'center',
    border: 'none',
    borderRadius: '10px',
    background: '#407DF4',
    color: 'white',
    padding: '20px 20px',
    margin: MARGIN_NUM,
    fontSize: FONT_SIZE,
    '&:focus': {
      outline: 0,
    },
  },
  mark: {
    position: 'relative',
    top: `-${INPUT_HEIGHT / 2 + FONT_SIZE / 2 + MARGIN_NUM}px`,
    left: '250px',
  },
});
