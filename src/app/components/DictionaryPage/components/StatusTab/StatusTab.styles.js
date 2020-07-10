import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  statusTab: {
    marginRight: 20,
    padding: '10px 20px',
    color: ({ isSelected }) => (isSelected ? '#1a3b71' : '#b1afae'),
    borderBottom: ({ isSelected }) => (isSelected ? '2px solid #1a3b71' : '2px solid #b1afae'),
    borderRadius: 14,
    cursor: 'pointer',
    fontWeight: 600,
    '@media (max-width: 520px)': {
      marginTop: 10,
    },
  },
});
