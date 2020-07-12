import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  hamburgerButton: {
    display: 'block',
    transformOrigin: '16px 11px',
    float: 'left',
    marginRight: '29px',
    outline: '0',
    border: '0',
    padding: '12px',
    background: 'none',
    cursor: 'pointer',
    '& span': {
      transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    },
    '&:focus': {
      outline: '0',
    },
    '&:hover': {
      '& span:nth-of-type(1)': {
        width: '33px',
      },
      '& span:nth-of-type(2)': {
        width: '40px',
      },
      '& span:nth-of-type(3)': {
        width: '33px',
      },
    },
    '&.active': {
      '& span:nth-of-type(1)': {
        transform: 'rotate(45deg) translate(10px, 10px)',
        width: '40px',
        background: 'white',
      },
      '& span:nth-of-type(2)': {
        opacity: '0',
        pointerEvents: 'none',
      },
      '& span:nth-of-type(3)': {
        transform: 'rotate(-45deg) translate(7px, -7px)',
        width: '40px',
        background: 'white',
      },
    },
  },
  line: {
    display: 'block',
    width: '40px',
    height: '5px',
    marginBottom: '7px',
    backgroundColor: 'black',
  },
});
