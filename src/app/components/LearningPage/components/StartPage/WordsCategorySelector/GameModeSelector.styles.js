import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  categoryPicker: {
    position: 'relative',
    color: 'white',
    background: '#333366',
    boxShadow: '2px 2px 3px 2px #e1e0de',
    borderRadius: ({ isOpen }) => (isOpen ? '5px 5px 0 0' : '5px'),
    transition: 'border-radius 0.2s',
    marginLeft: '20px',
  },
  dropdownButton: {
    width: 250,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: isOpen => (isOpen ? '5px 5px 0 0' : 5),
  },
  dropdownList: {
    position: 'absolute',
    zIndex: 1,
    transition: 'max-height 0.4s linear, border-radius 0.2s',
    maxHeight: ({ isOpen }) => (isOpen ? '150px' : '0'),
    borderRadius: ({ isOpen }) => (isOpen ? '0 0  5px 5px' : '0'),
    overflow: 'hidden',
  },
});
