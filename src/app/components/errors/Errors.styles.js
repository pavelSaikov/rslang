import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  errors: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: '50%',
    marginLeft: -150,
  },
});
