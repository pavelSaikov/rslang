import { createUseStyles } from 'react-jss';

const INPUT_HEIGHT = 50;

export const useStyles = createUseStyles({
  words: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wordItem: {
    width: '220px',
    height: INPUT_HEIGHT,
    border: '1px solid black',
    margin: '10px',
    borderRadius: '10px',
    '&:hover': {
      boxShadow: '2px 2px 5px #709EF7',
    },
  },
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
  word: {
    position: 'relative',
    left: '45px',
    top: '-30px',
  },
  transcription: {
    position: 'relative',
    left: '45px',
    top: '-30px',
  },
});
