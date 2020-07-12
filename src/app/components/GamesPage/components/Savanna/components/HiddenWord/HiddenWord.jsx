import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './HiddenWord.styles';

export const HiddenWord = ({ gameState, answer }) => {
  const { hiddenWord } = useStyles({ answer });
  return <p className={hiddenWord}>{gameState.correctWord.word}</p>;
};

HiddenWord.propTypes = {
  answer: PropTypes.string.isRequired,
  gameState: PropTypes.object.isRequired,
};
