import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  levelItem: {
    width: 250,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    borderRadius: ({ isLast }) => (isLast ? '0 0 5px 5px' : 0),
    cursor: 'pointer',
    backgroundColor: ({ isSelected }) => (isSelected ? 'rgba(174, 181, 185, 0.8)' : 'rgba(76, 82, 85, 0.8)'),
    '&:hover': {
      backgroundColor: 'rgb(174, 181, 185)',
    },
  },
});
