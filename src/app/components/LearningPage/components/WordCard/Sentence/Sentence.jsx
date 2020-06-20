import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { INPUT_STATE, FONT_SIZE } from './Sentence.models';
import { useStyles } from './Sentence.style';

export const Sentence = ({ textExample, onCorrectInput, onIncorrectInput }) => {
  const [inputState, setInputState] = useState(INPUT_STATE.INITIAL);
  const [learningWordIndex, setLearningWordIndex] = useState(null);
  const [sentence, setSentence] = useState(null);
  const inputRef = useRef(null);
  const classes = useStyles(inputState);

  useEffect(() => {
    const wordsInfo = textExample.split(' ').reduce(
      (res, word, index) => {
        if (word.includes('<')) {
          res.learningWordIndex = index;

          const start = word.indexOf('>');
          const end = word.lastIndexOf('<');
          res.words.push(word.slice(start + 1, end));
        } else {
          res.words.push(word);
        }

        return res;
      },
      { learningWordIndex: null, words: [] },
    );

    setLearningWordIndex(wordsInfo.learningWordIndex);
    setSentence(wordsInfo.words);
  }, [textExample]);

  useEffect(() => {
    const onInputClick = e => {
      if (e.key !== 'Enter' && e.repeat) {
        return;
      }

      const userInput = inputRef.current.value;
      if (userInput.length !== 0) {
        return;
      }

      if (userInput !== sentence[learningWordIndex]) {
        onIncorrectInput();
        setInputState(INPUT_STATE.MISTAKE);
      } else {
        onCorrectInput();
        setInputState(INPUT_STATE.CORRECT);
      }
    };

    window.addEventListener('keydown', onInputClick);

    return () => window.removeEventListener('keydown', onInputClick);
  }, [onCorrectInput, onIncorrectInput, sentence, learningWordIndex]);

  return (
    sentence && (
      <div className={classes.exampleSentence}>
        {sentence.map((word, index) => {
          return index === learningWordIndex ? (
            <div key={word + index}>
              <input className={classes.input} ref={inputRef} style={{ width: FONT_SIZE * word.split('').length }} />
            </div>
          ) : (
            <div key={word + index} className={classes.word}>
              {word}
            </div>
          );
        })}
      </div>
    )
  );
};
Sentence.propTypes = {
  textExample: PropTypes.string.isRequired,
  onCorrectInput: PropTypes.func.isRequired,
  onIncorrectInput: PropTypes.func.isRequired,
};
