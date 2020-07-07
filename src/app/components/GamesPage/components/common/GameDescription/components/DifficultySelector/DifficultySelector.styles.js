import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  categoryPicker: {
    margin: 20,
  },
  dropdownButton: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(174, 181, 185, 0.5)',
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: isOpen => (isOpen ? '5px 5px 0 0' : 5),
  },
  dropdownList: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    top: '10px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
});
