import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from '../SettingsPage.styles';

export const Toggle = ({ toggleClick, defaultState, action }) => {
  const onToggleClick = useCallback(() => {
    toggleClick(action, !defaultState);
  }, [toggleClick, defaultState, action]);

  const { cToggleBtn, toggleDiv, toggleSpan, on, off, toggleInput, switchSetting } = useStyles();

  return (
    <div className={switchSetting}>
      <div className={cToggleBtn}>
        <input type="checkbox" className={toggleInput} onChange={onToggleClick} checked={defaultState} />
        <div className={toggleDiv}>
          <label className={on}>On</label>
          <label className={off}>Off</label>
          <span className={toggleSpan}></span>
        </div>
      </div>
    </div>
  );
};

Toggle.propTypes = {
  toggleClick: PropTypes.func.isRequired,
  defaultState: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
};
