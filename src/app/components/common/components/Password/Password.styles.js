import { createUseStyles } from 'react-jss';

const INPUT_HEIGHT = 50;
const FONT_SIZE = 14;
const MARGIN_NUM = 0;

export const useStyles = createUseStyles({
  passwordContainer: { position: 'relative', display: 'flex', alignItems: 'center', marginBottom: 10 },
  input: {
    width: '100%',
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
    '@media (max-width: 400px)': {
      fontSize: 11,
    },
  },
  mark: {
    display: 'inline',
    position: 'absolute',
    left: '85%',
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
