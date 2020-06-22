import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(() => {
  return {
    wrapperFlexRow: {
      width: '80vw',
      display: 'flex',
      justifyContent: 'center',
    },
    wrapperFlexColumn: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    wrapper: {
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '2px 2px 20px grey',
    },
  };
});
