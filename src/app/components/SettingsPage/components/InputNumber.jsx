import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from '../SettingsPage.styles';
import '../../../../../src/theme/style.css';

export const InputNumber = ({ inputChange, settingName, defaultState }) => {
  const onInputChange = useCallback(
    event => {
      inputChange(+event.target.value, settingName);
    },
    [inputChange, settingName],
  );

  const { inputBlock, switchSetting } = useStyles();

  return (
    <div className={switchSetting}>
      <input type="number" className={inputBlock} onChange={onInputChange} value={defaultState} />
    </div>
  );
};

InputNumber.propTypes = {
  inputChange: PropTypes.func.isRequired,
  defaultState: PropTypes.number.isRequired,
  settingName: PropTypes.string.isRequired,
};
