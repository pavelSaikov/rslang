import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  progressStrip: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'no-wrap',
    width: '100%',
    maxWidth: 600,
    height: 10,
    marginBottom: 20,
  },
  numericBorder: {
    padding: '0 5px',
    color: '#438c9a',
  },
});
