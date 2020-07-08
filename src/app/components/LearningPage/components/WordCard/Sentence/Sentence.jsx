import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import { INPUT_STATE } from './Sentence.models';
import { useStyles } from './Sentence.style';

export const Sentence = ({
  textExample,
  onCorrectInput,
  onIncorrectInput,
  isShowAnswer,
  gameWordIndex,
  isCheckAnswerClick,
}) => {
  const [inputState, setInputState] = useState(INPUT_STATE.INITIAL);
  const [learningWordIndex, setLearningWordIndex] = useState(null);
  const [sentence, setSentence] = useState(null);
  const [previousUserAnswer, setPreviousUserAnswer] = useState(null);
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef(null);
  const spanRef = useRef(null);
  const classes = useStyles(inputState);

  const checkUserAnswer = useMemo(
    () => () => {
      const userAnswer = inputRef.current.value;
      const isInvalidUserInput = !userAnswer.length || userAnswer === previousUserAnswer;
      if (isInvalidUserInput) {
        return;
      }

      if (userAnswer !== sentence[learningWordIndex]) {
        setInputState(INPUT_STATE.MISTAKE);
        setPreviousUserAnswer(userAnswer);
        onIncorrectInput();
      } else {
        setInputState(INPUT_STATE.CORRECT);
        setPreviousUserAnswer(userAnswer);
        inputRef.current.setAttribute('disabled', '');
        onCorrectInput();
      }
    },
    [sentence, learningWordIndex, onCorrectInput, onIncorrectInput, previousUserAnswer],
  );

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [sentence]);

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

    setInputState(INPUT_STATE.INITIAL);
    setLearningWordIndex(wordsInfo.learningWordIndex);
    setSentence(wordsInfo.words);
    setPreviousUserAnswer(null);

    if (inputRef.current) {
      inputRef.current.removeAttribute('disabled');
      inputRef.current.value = '';
    }
  }, [textExample, gameWordIndex]);

  useEffect(() => {
    if (!isShowAnswer) {
      return;
    }

    inputRef.current.value = sentence[learningWordIndex];
    inputRef.current.setAttribute('disabled', '');
    setInputState(INPUT_STATE.CORRECT);
  }, [isShowAnswer, learningWordIndex, sentence]);

  useEffect(() => {
    const onInputClick = e => {
      const isIncorrectKeyboardPressing = e.key !== 'Enter' || e.repeat;

      if (isIncorrectKeyboardPressing) {
        return;
      }
      if (!isCheckAnswerClick && !isShowAnswer) {
        checkUserAnswer();
      }
    };

    window.addEventListener('keydown', onInputClick);

    return () => window.removeEventListener('keydown', onInputClick);
  }, [checkUserAnswer, isShowAnswer, isCheckAnswerClick]);

  useEffect(() => {
    if (isCheckAnswerClick && !isShowAnswer) {
      checkUserAnswer();
    }
  }, [isCheckAnswerClick, checkUserAnswer, isShowAnswer]);

  return (
    sentence && (
      <div className={classes.exampleSentence}>
        {sentence.map((word, index) => {
          return index === learningWordIndex ? (
            <div key={word + index}>
              <input className={classes.input} ref={inputRef} style={{ width: `${inputWidth}px` }} autoFocus />
              <span ref={spanRef} className={`${classes.input} ${classes.span}`}>
                {word}
              </span>
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
  isShowAnswer: PropTypes.bool.isRequired,
  gameWordIndex: PropTypes.number.isRequired,
  isCheckAnswerClick: PropTypes.bool.isRequired,
};
