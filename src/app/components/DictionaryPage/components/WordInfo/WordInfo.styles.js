import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wordInfoContainer: {
    width: '30%',
    margin: 15,
    padding: '20px 20px',
    boxSizing: 'border-box',
    borderRadius: 10,
    background: 'white',
    boxShadow: '0px 0px 6px 4px #e1e0de',
    '@media (max-width: 1550px)': {
      width: '45%',
    },
    '@media (max-width: 950px)': {
      width: '100%',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    background: '#f6f6f6',
    color: '#338c99',
    padding: '0 10px',
    borderRadius: 10,
  },
  imageContainer: {
    padding: '10px 0px',
    marginRight: 15,
  },
  image: {
    width: 60,
    height: 60,
    clipPath: 'circle(50% at 50% 50%)',
  },
  wordContainer: {
    fontSize: 20,
    fontWeight: 600,
    flexGrow: 1,
  },
  changeStatusButtonContainer: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    color: '#1a3b71',
  },
  translationContainer: {
    marginTop: 10,
    padding: '5px 0',
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: '#1a3b71',
    borderBottom: '2px solid #f0eae6',
  },
  voiceIcon: {
    marginLeft: 20,
  },
  definitionContainer: {
    marginTop: 12,
    paddingBottom: 3,
    color: '#1a3b71',
    fontWeight: 500,
  },
  bold: {
    fontWeight: 700,
  },
});
