import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from '../SettingsPage.styles';
import '../../../../../src/theme/style.css';

export const InputNumber = ({ inputChange, defaultState, action, min, max }) => {
  const onInputChange = useCallback(
    event => {
      if (event.target.value >= min && event.target.value <= max) {
        inputChange(action, event.target.value);
      }
    },
    [inputChange, action, min, max],
  );

  const { inputBlock, switchSetting } = useStyles();

  return (
    <div className={switchSetting}>
      <input type="number" min={min} max={max} className={inputBlock} onChange={onInputChange} value={defaultState} />
    </div>
  );
};

InputNumber.propTypes = {
  inputChange: PropTypes.func.isRequired,
  defaultState: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
