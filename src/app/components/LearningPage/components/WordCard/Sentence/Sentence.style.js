import { createUseStyles } from 'react-jss';
import { INPUT_STATE_COLOR_MAP, FONT_SIZE } from './Sentence.models';

export const useStyles = createUseStyles({
  exampleSentence: {
    fontSize: FONT_SIZE,
    display: 'flex',
  },
  input: {
    background: '#e2ebef',
    color: inputState => INPUT_STATE_COLOR_MAP.get(inputState),
    border: 0,
    borderRadius: 5,
    fontSize: FONT_SIZE,
  },
  word: {
    color: '#438c9a',
    margin: '0 3px',
  },
});
