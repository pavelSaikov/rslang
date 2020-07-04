import { createUseStyles } from 'react-jss';

const INPUT_HEIGHT = 50;
const FONT_SIZE = 14;
const MARGIN_NUM = 0;

export const useStyles = createUseStyles({
  input: {
    width: 300,
    height: INPUT_HEIGHT,
    paddingLeft: '15px',
    boxSizing: 'border-box',
    border: 'none',
    borderBottom: '1px #407DF4 solid',
    outline: 'none',
    color: 'black',
    fontSize: FONT_SIZE,
    '&::placeholder': {
      color: 'black',
    },
    margin: MARGIN_NUM,
  },
  mark: {
    position: 'relative',
    top: `-${INPUT_HEIGHT / 2 + FONT_SIZE / 2 + MARGIN_NUM}px`,
    left: '250px',
  },
  hidden: {
    visibility: 'hidden',
  },
  caption: {
    color: 'grey',
  },
  captionWrong: {
    color: 'red',
  },
  captionCorrect: {
    color: 'green',
  },
});
