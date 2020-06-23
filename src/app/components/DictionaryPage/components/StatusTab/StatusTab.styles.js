import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  statusTab: {
    marginRight: 20,
    padding: '10px 20px',
    border: '1px solid black',
    borderRadius: 14,
    cursor: 'pointer',
    '&.selected': {
      background: '#D6D6D6',
    },
  },
});
