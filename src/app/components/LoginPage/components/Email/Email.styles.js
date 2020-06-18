import { createUseStyles } from 'react-jss';

const inputHeight = 50;
const sizeOfFont = 14;
const marginNum = 0;

export const useStyles = createUseStyles(() => {
  return {
    input: {
      width: 300,
      height: inputHeight,
      paddingLeft: '15px',
      boxSizing: 'border-box',
      border: 'none',
      borderBottom: '2px blue solid',
      outline: 'none',
      color: 'black',
      fontSize: sizeOfFont,
      '&::placeholder': {
        color: 'black',
      },
      margin: marginNum,
    },
    mark: {
      position: 'relative',
      top: `-${inputHeight / 2 + sizeOfFont / 2 + marginNum}px`,
      left: '250px',
    },
    hidden: {
      visibility: 'hidden',
    },
  };
});
