import React, { useEffect } from 'react';

// import PropTypes from 'prop-types';
// import { useStyles } from '../Sprint.styles';
import { wordsService } from '../../../../../services/WordsService/WordsService';

export const Word = () => {
  let words = wordsService.getRandomWordsFromGroup({ groupNumber: 0, wordsNumber: 20, wordPerExampleSentenceLTE: 7 });

  console.log(words);

  useEffect(() => {
    return;
  }, []);

  // const { timerWrapper } = useStyles();

  return <div>{}</div>;
};

// Word.propTypes = {
//   time: PropTypes.number.isRequired,
//   onTimerEnd: PropTypes.func.isRequired,
// };
