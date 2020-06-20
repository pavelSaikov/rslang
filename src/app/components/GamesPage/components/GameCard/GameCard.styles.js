import { createUseStyles } from 'react-jss';
import { CARDS_NAMES_COLORS_MAP } from './GameCard.models';

export const useStyles = createUseStyles({
  gameCard: {
    width: 358,
    height: 358,
    borderRadius: 25,
    textAlign: 'center',
    color: '#ffffff',
    margin: 10,
    background: name => CARDS_NAMES_COLORS_MAP.get(name),
  },

  gameName: {
    fontSize: 36,
    lineHeight: '44px',
    margin: '56px 0 56px 0',
  },

  gameLink: {
    fontSize: 24,
    color: 'inherit',
    lineHeight: '29px',
  },
});
