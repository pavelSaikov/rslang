import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './ControlButtons.style';

export const ControlButtons = ({ onClickBut }) => {
  const inputEl = useRef(null);

  const onContainerBlur = useCallback(() => inputEl.current.focus(), []);

  useEffect(() => onContainerBlur(), [onContainerBlur]);

  const { buttonsWrapper, buttonTrue, buttonFalse } = useStyles();

  return (
    <div
      className={buttonsWrapper}
      ref={inputEl}
      onBlur={onContainerBlur}
      onKeyUp={event => {
        if (event.key === 'ArrowRight') onClickBut(true);
        if (event.key === 'ArrowLeft') onClickBut(false);
      }}
      tabIndex={0}
    >
      <button className={buttonFalse} onClick={useCallback(() => onClickBut(false), [onClickBut])}>
        Неправда
      </button>
      <button className={buttonTrue} onClick={useCallback(() => onClickBut(true), [onClickBut])}>
        Правда
      </button>
    </div>
  );
};

ControlButtons.propTypes = {
  onClickBut: PropTypes.func.isRequired,
};
