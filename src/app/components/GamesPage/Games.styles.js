import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageWrapper: { display: 'flex', flexDirection: 'column', minHeight: '100%', fontSize: 18, color: '#333366' },
  componentsWrapper: {
    width: '100%',
    padding: '50px 4% 0 4%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    boxSizing: 'border-box',
    background: '#f7f2ee',
  },
  gameCardsContainer: {
    width: '100%',
    maxWidth: 1200,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
