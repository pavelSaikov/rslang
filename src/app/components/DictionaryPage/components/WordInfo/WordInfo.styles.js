import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  wordInfoContainer: {
    maxWidth: 1000,
    padding: '0 20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
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
    fontSize: 30,
  },
  translationContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  voiceIcon: {
    marginLeft: 20,
  },
});
