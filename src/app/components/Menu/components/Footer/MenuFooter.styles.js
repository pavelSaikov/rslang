import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  footer: {
    width: '400px',
    position: 'absolute',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001F4B',
  },
  footerLink: {
    color: 'white',
    fontWeight: '500',
    fontSize: '20px',
  },
  navigationIcon: {
    paddingRight: '10px',
  },
});
