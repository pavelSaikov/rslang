import { createUseStyles } from 'react-jss';

import { GAME_STATUS } from '../../AudioChallenge.models';

export const useStyles = createUseStyles({
  audioComponentWrapper: {
    display: ({ gameStatus }) => (gameStatus === GAME_STATUS.CHOICE ? 'block' : 'grid'),
    gridTemplateAreas: '"img img" "btn translate"',
    gridGap: '20px',
    alignItems: 'center',
    marginTop: '100px',
  },
  audioComponent: {
    height: '310px',
  },
  audioComponentImg: {
    display: ({ gameStatus }) => (gameStatus === GAME_STATUS.CHOICE ? 'none' : 'block'),
    gridArea: 'img',
    width: '124px',
    height: '124px',
    margin: '0 auto',
    backgroundImage: ({ correctAnswerInThisRound }) => `url(${correctAnswerInThisRound.image})`,
    borderRadius: '50%',
    border: 'solid 2px #ffffff',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  audioComponentButton: {
    position: 'relative',
    gridArea: 'btn',
    fontSize: ({ gameStatus }) => (gameStatus === GAME_STATUS.CHOICE ? '67px' : '42px'),
    width: ({ gameStatus }) => (gameStatus === GAME_STATUS.CHOICE ? '124px' : '60px'),
    height: ({ gameStatus }) => (gameStatus === GAME_STATUS.CHOICE ? '124px' : '60px'),
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    opacity: '0.2',
    marginTop: ({ gameStatus }) => (gameStatus === GAME_STATUS.CHOICE ? '100px' : '0px'),
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.1',
    },
  },
  audioComponentIcon: {
    position: 'absolute',
    color: '#0000009c',
    top: ({ gameStatus }) => (gameStatus === GAME_STATUS.CHOICE ? '30px' : '10px'),
    left: ({ gameStatus }) => (gameStatus === GAME_STATUS.CHOICE ? '34px' : '13px'),
  },
  audioComponentTranslate: {
    gridArea: 'translate',
    display: ({ gameStatus }) => (gameStatus === GAME_STATUS.CHOICE ? 'none' : 'block'),
    fontSize: '32px',
  },
});
