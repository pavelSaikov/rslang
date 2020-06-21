import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { singleToggleSettingsConfig } from './SettingsConfig';
import { groupToggleForCardSettingsConfig } from './SettingsConfig';
import { numberInputSettingsConfig } from './SettingsConfig';
import { settingsSelector } from './store/Settings.selectors';
import { useStyles } from './SettingsPage.styles';

export const SettingsPage = () => {
  const settings = useSelector(settingsSelector);
  const dispatch = useDispatch();

  const callbackForNoGroupToggleSettings = useCallback(
    (flag, settingName) => {
      dispatch(singleToggleSettingsConfig[settingName].action(flag));
      return true;
    },
    [dispatch],
  );

  const callbackForInputNumberSettings = useCallback(
    (flag, settingName) => {
      dispatch(numberInputSettingsConfig[settingName].action(flag));
    },
    [dispatch],
  );

  const callbackForGroupToggleCardSettings = useCallback(
    (flag, settingName) => {
      if (!flag) {
        const countTrueFlag = Object.keys(groupToggleForCardSettingsConfig).reduce((count, key) => {
          if (key !== settingName && settings[key] === true) count += 1;
          return count;
        }, 0);
        if (countTrueFlag === 0) {
          console.log('Select at least one item');
          return false;
        }
      }
      dispatch(groupToggleForCardSettingsConfig[settingName].action(flag));
      return true;
    },
    [dispatch, settings],
  );

  const { settingWrapper, settingsPageTitle } = useStyles();

  return (
    <div>
      <h2 className={settingsPageTitle}>Settings Page</h2>
      {Object.entries(numberInputSettingsConfig).map(([settingName, { settingString, Component }]) => {
        return (
          <div key={settingName} className={settingWrapper}>
            <Component
              settingName={settingName}
              inputChange={callbackForInputNumberSettings}
              defaultState={settings[settingName]}
            />{' '}
            <div>{settingString}</div>
          </div>
        );
      })}
      {Object.entries(singleToggleSettingsConfig).map(([settingName, { settingString, Component }]) => {
        return (
          <div key={settingName} className={settingWrapper}>
            <Component
              settingName={settingName}
              toggleClick={callbackForNoGroupToggleSettings}
              defaultState={settings[settingName]}
            />{' '}
            <div>{settingString}</div>
          </div>
        );
      })}
      <h3 className={settingsPageTitle}>Settings for card</h3>
      {Object.entries(groupToggleForCardSettingsConfig).map(([settingName, { settingString, Component }]) => {
        return (
          <div key={settingName} className={settingWrapper}>
            <Component
              settingName={settingName}
              toggleClick={callbackForGroupToggleCardSettings}
              defaultState={settings[settingName]}
            />{' '}
            <div>{settingString}</div>
          </div>
        );
      })}
    </div>
  );
};
