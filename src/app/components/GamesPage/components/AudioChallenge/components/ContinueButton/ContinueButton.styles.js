import { createUseStyles } from 'react-jss';

import { GAME_STATUS } from '../../AudioChallenge.models';

export const useStyles = createUseStyles({
  continueButton: {
    position: 'relative',
    width: '200px',
    height: '50px',
    marginBottom: '120px',
    borderRadius: '4px',
    fontSize: gameStatus => gameStatus !== GAME_STATUS.CHOICE && '34px',
    border: gameStatus => (gameStatus === GAME_STATUS.CHOICE ? 'solid 1px #ffffff' : 'none'),
    backgroundColor: gameStatus =>
      gameStatus === GAME_STATUS.CHOICE ? 'rgba(255,255,255, 0.0)' : 'rgba(255,255,255, 0.2)',
    cursor: 'pointer',
    color: '#ffffff',
    opacity: '0.4',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, 0.4)',
    },
    '&:active': {
      backgroundColor: 'rgba(255,255,255, 0.6)',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  continueButtonIcon: {
    position: 'relative',
    top: '3px',
    color: '#ffffff',
  },
});
