import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  navigation: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    bottom: '0px',
    zIndex: '293',
    display: 'block',
    width: '400px',
    maxWidth: '100%',
    marginTop: '0px',
    paddingTop: '100px',
    paddingRight: '0px',
    alignItems: 'stretch',
    backgroundColor: '#182F51',
    transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    transform: isMenuOpen => (isMenuOpen ? 'translateX(0)' : 'translateX(-100%)'),
    '& a': {
      position: 'relative',
      display: 'block',
      textAlign: 'left',
      maxWidth: '100%',
      paddingTop: '25px',
      paddingBottom: '25px',
      paddingLeft: '16%',
      backgroundPosition: '88% 50%',
      backgroundSize: '36px',
      backgroundRepeat: 'no-repeat',
      transition: 'background-position 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      textDecoration: 'none',
      color: '#fff',
      fontSize: '20px',
      lineHeight: '120%',
      fontWeight: '500',
      '&:hover': {
        backgroundPosition: '90% 50%',
      },
    },
  },
});
