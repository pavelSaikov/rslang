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
      borderBottom: '1px #407DF4 solid',
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
    header: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: '20px',
    },
    caption: {
      color: 'grey',
    },
  };
});
