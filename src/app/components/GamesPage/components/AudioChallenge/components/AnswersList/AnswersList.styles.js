import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  answersList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '70px',
    marginBottom: '120px',
    listStyleType: 'none',
    fontSize: '17px',
    lineHeight: '45px',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
});
