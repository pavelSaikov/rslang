import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  blank: {
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100vh',
    zIndex: '-1',
  },
  zeroPercent: {
    backgroundColor: 'lightgray',
  },
  twentyPercent: {
    backgroundColor: 'red',
  },
  fortyPercent: {
    backgroundColor: 'brown',
  },
  sixtyPercent: {
    backgroundColor: 'orange',
  },
  eightyPercent: {
    backgroundColor: 'yellow',
  },
  hundredPercent: {
    backgroundColor: 'green',
  },
});
