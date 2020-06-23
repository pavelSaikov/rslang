import { createUseStyles } from 'react-jss';
import { INPUT_STATE_COLOR_MAP } from './Sentence.models';

export const useStyles = createUseStyles({
  exampleSentence: {
    display: 'flex',
  },
  input: {
    background: '#e2ebef',
    color: inputState => INPUT_STATE_COLOR_MAP.get(inputState),
    border: 0,
    borderRadius: 5,
  },
  span: {
    position: 'absolute',
    height: 0,
    overflow: 'hidden',
  },
  word: {
    color: '#438c9a',
    margin: '0 3px',
  },
});
