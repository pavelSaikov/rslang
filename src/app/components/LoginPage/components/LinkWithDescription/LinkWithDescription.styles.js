import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(() => {
  return {
    description: {
      color: 'grey',
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
  };
});
