import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  footer: {
    width: '200px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001F4B',
  },
  footerLink: {
    color: 'white',
    fontWeight: '500',
  },
});
