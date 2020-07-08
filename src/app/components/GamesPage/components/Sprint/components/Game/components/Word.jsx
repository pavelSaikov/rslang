import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Word.style';

export const Word = ({ data }) => {
  const { word, translation } = data;

  const { dataWrapper, wordStyle, translationStyle } = useStyles();

  return (
    <div className={dataWrapper}>
      <div className={wordStyle}>{word}</div>
      <div className={translationStyle}>{translation}</div>
    </div>
  );
};

Word.propTypes = {
  data: PropTypes.object.isRequired,
};
