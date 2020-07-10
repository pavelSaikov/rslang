import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  navigationList: {
    width: '100%',
    minHeight: 410,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  navigationLink: {
    position: 'relative',
    display: 'flex',
    textAlign: 'left',
    maxWidth: '100%',
    padding: '12px 0',
    paddingLeft: '16%',
    backgroundPosition: '88% 50%',
    backgroundSize: '36px',
    backgroundRepeat: 'no-repeat',
    transition: 'background-position 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    fontSize: '20px',
    lineHeight: '120%',
    fontWeight: '500',

    marginBottom: '20px',
    color: 'white',
    textDecoration: 'none',
    overflow: 'hidden',
    listStyle: 'none',
    '&:hover': {
      backgroundColor: '#001F4B',
    },
  },
  navigationIcon: {
    paddingRight: '20px',
  },
});
