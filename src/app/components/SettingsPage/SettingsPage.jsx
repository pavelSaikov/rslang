import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Toggle } from './components/Toggle';
import { InputNumber } from './components/InputNumber';
import { singleToggleSettingsConfig } from './settings-config';
import { groupToggleForCardSettingsConfig } from './settings-config';
import { numberInputSettingsConfig } from './settings-config';
import { settingsSelector } from './store/Settings.selectors';
import { useStyles } from './SettingsPage.styles';
import { ROUTES } from '../../routing/routes';
import { initializeSettingsPage, updateSettings } from './store/Settings.thunks';

export const SettingsPage = () => {
  const settings = useSelector(settingsSelector);
  const dispatch = useDispatch();
  const [isPageInitialized, setIsPageInitialized] = useState(false);
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(initializeSettingsPage({ setIsPageInitialized, setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [dispatch]);

  useEffect(() => {
    if (!isPageInitialized) {
      return;
    }

    const controller = new AbortController();
    dispatch(updateSettings({ setIsRedirectToLoginPage, settings, controller }));

    return () => controller.abort();
  }, [settings, isPageInitialized, dispatch]);

  const callbackForNoGroupToggleSettings = useCallback(
    (action, flag) => {
      dispatch(action(flag));
    },
    [dispatch],
  );

  const callbackForInputNumberSettings = useCallback(
    (action, flag) => {
      dispatch(action(flag));
    },
    [dispatch],
  );

  const callbackForGroupToggleCardSettings = useCallback(
    (action, flag) => {
      const countTrueFlag = groupToggleForCardSettingsConfig.reduce((count, setting) => {
        if (settings[setting.settingName]) count += 1;
        return count;
      }, 0);

      if (!flag && countTrueFlag === 1) {
        return;
      }
      dispatch(action(flag));
    },
    [dispatch, settings],
  );

  const { settingWrapper, settingsPageTitle } = useStyles();

  if (isRedirectToLoginPage) {
    return <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: ROUTES.SETTINGS } }} />;
  }

  return (
    isPageInitialized && (
      <div>
        <h2 className={settingsPageTitle}>Settings Page</h2>
        {numberInputSettingsConfig.map(({ settingString, action, settingName }) => {
          return (
            <div key={settingString} className={settingWrapper}>
              <InputNumber
                inputChange={callbackForInputNumberSettings}
                defaultState={settings[settingName]}
                action={action}
              />
              <div>{settingString}</div>
            </div>
          );
        })}
        {singleToggleSettingsConfig.map(({ settingString, action, settingName }) => {
          return (
            <div key={settingString} className={settingWrapper}>
              <Toggle
                toggleClick={callbackForNoGroupToggleSettings}
                defaultState={settings[settingName]}
                action={action}
              />
              <div>{settingString}</div>
            </div>
          );
        })}
        <h3 className={settingsPageTitle}>Settings for card</h3>
        {groupToggleForCardSettingsConfig.map(({ settingString, action, settingName }) => {
          return (
            <div key={settingName} className={settingWrapper}>
              <Toggle
                settingName={settingName}
                toggleClick={callbackForGroupToggleCardSettings}
                defaultState={settings[settingName]}
                action={action}
              />
              <div>{settingString}</div>
            </div>
          );
        })}
      </div>
    )
  );
};
