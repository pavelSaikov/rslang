import { createUseStyles } from 'react-jss';

const inputHeight = 50;
const sizeOfFont = 14;
const marginNum = 0;

export const useStyles = createUseStyles(() => {
  return {
    btn: {
      width: '300px',
      height: inputHeight,
      textAlign: 'left',
      border: 'none',
      borderRadius: '10px',
      background: '#407DF4',
      color: 'white',
      padding: '20px 20px',
      margin: marginNum,
      fontSize: sizeOfFont,
      '&:focus': {
        outline: 0,
      },
    },
    mark: {
      position: 'relative',
      top: `-${inputHeight / 2 + sizeOfFont / 2 + marginNum}px`,
      left: '250px',
    },
  };
});
