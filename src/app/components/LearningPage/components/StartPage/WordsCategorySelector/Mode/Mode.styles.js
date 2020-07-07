import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  modeItem: {
    width: 250,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ({ isLast }) => (isLast ? '0 0 5px 5px' : 0),
    cursor: 'pointer',
    backgroundColor: ({ isSelected }) => (isSelected ? '#333366' : '#a1ace3'),
    '&:hover': {
      backgroundColor: '#333366',
    },
  },
});
