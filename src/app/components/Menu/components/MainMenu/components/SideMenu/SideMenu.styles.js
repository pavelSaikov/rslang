import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  navigation: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: '2',
    paddingTop: '100px',
    alignItems: 'stretch',
    backgroundColor: '#182F51',
    transition: 'transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    overflow: 'scroll',
    transform: ({ isMenuOpen }) => (isMenuOpen ? 'translateX(0)' : 'translateX(-100%)'),
  },
});
