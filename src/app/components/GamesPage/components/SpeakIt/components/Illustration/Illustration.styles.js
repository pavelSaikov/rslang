import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  box: {
    width: '300px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
  },
  illustration: {
    width: '300px',
    height: '200px',
    boxShadow: '2px 2px 10px grey',
    borderRadius: '5px',
  },
});
