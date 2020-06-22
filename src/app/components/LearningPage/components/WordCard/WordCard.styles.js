import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    border: '1px solid black',
    borderRadius: 5,
    padding: '10px 5px',
    marginBottom: 8,
  },
  wordCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    border: '1px solid black',
    borderRadius: 5,
  },
  imageAndTranslationContainer: {
    display: 'flex',
    alignItems: 'center',
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
    fontSize: 20,
  },
});
