import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './GameLife.styles';
import { ExitButton } from '../../../common/ExitButton/ExitButton';

export const GameLife = ({ answer, countWrongAnswers, closeGame }) => {
  const { gameLife, lifePoint } = useStyles({ answer, countWrongAnswers });

  return (
    <div className={gameLife}>
      <i className={`icon-heart ${lifePoint}`}></i>
      <i className={`icon-heart ${lifePoint}`}></i>
      <i className={`icon-heart ${lifePoint}`}></i>
      <i className={`icon-heart ${lifePoint}`}></i>
      <i className={`icon-heart ${lifePoint}`}></i>
      <ExitButton onCrossClick={closeGame} />
    </div>
  );
};

GameLife.propTypes = {
  closeGame: PropTypes.func.isRequired,
  countWrongAnswers: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
};
