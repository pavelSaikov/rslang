import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wordCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 700,
    padding: 20,
    borderRadius: 5,
    boxSizing: 'border-box',
    background: 'white',
    boxShadow: '0px 0px 6px 4px #e1e0de',
  },
  container: {
    width: '100%',
    padding: '10px 5px',
    marginBottom: 10,
    borderRadius: 5,
    boxShadow: '0px 0px 2px 2px #e1e0de',
  },
  imageAndTranslationContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'no-wrap',
  },
  voiceToggleContainer: {
    flexGrow: 1,
    margin: '0 10px',
  },
  imageContainer: {
    width: 60,
    height: 60,
    clipPath: 'circle(50% at 50% 50%)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  translation: {
    marginLeft: 15,
    fontWeight: 600,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    width: '100%',
    maxWidth: 330,
    '@media (max-width: 350px)': {
      flexDirection: 'column',
    },
  },
  button: {
    boxShadow: '2px 2px 3px 2px #e1e0de',
    background: '#f5f5f5',
    '@media (max-width: 350px)': {
      marginTop: 15,
    },
  },
});
