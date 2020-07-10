import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  footer: {
    width: 400,
    padding: '30px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001F4B',
    '@media (max-width: 1300px)': {
      width: 320,
    },
  },
  footerLink: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
  navigationIcon: {
    paddingRight: 10,
  },
});
