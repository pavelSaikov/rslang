import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Toggle } from './components/Toggle/Toggle';
import { InputNumber } from './components/InputNumber/InputNumber';
import { singleToggleSettingsConfig } from './settings-config';
import { groupToggleForCardSettingsConfig } from './settings-config';
import { numberInputSettingsConfig } from './settings-config';
import { settingsSelector } from './store/Settings.selectors';
import { useStyles } from './SettingsPage.styles';
import { ROUTES } from '../../routing/routes';
import { updateSettings } from './store/Settings.thunks';
import {
  updateCommonStatistics,
  loadStatistics,
  loadSettings,
  checkIsAllStatisticsLoaded,
} from '../LearningPage/store/LearningPage.thunks';
import { Menu } from '../Menu/Menu';
import { useSetLastVisiting } from '../common/hooks/useSetLastVisiting';
import { useCheckCommonStatistics } from '../common/hooks/useCheckCommonStatistics';
import { statisticsSelector } from '../StatisticsPage/store/Statistics.selectors';
import { Loading } from '../common/components/Loading/Loading';

export const SettingsPage = () => {
  const classes = useStyles();
  const settings = useSelector(settingsSelector);
  const statistics = useSelector(statisticsSelector);
  const dispatch = useDispatch();
  const [isPageInitialized, setIsPageInitialized] = useState(false);
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(updateCommonStatistics({ setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [dispatch, settings]);

  useEffect(() => {
    if (checkIsAllStatisticsLoaded({ statistics })) {
      return;
    }

    const controller = new AbortController();
    dispatch(loadStatistics({ setIsRedirectToLoginPage, setIsStatisticsPrepared: () => {}, controller }));

    return () => controller.abort();
  }, [dispatch, statistics]);

  useEffect(() => {
    if (settings) {
      setIsPageInitialized(true);
      return;
    }

    const controller = new AbortController();
    dispatch(loadSettings({ setIsRedirectToLoginPage, controller }));

    return () => controller.abort();
  }, [settings, dispatch]);

  useEffect(() => {
    if (!isPageInitialized) {
      return;
    }

    const controller = new AbortController();
    dispatch(updateSettings({ setIsRedirectToLoginPage, settings, controller }));

    return () => controller.abort();
  }, [settings, isPageInitialized, dispatch]);

  useSetLastVisiting({ setIsRedirectToLoginPage, dispatch });

  useCheckCommonStatistics({ statistics, dispatch, setIsRedirectToLoginPage, setIsStatisticsPrepared: () => {} });

  const callbackForNoGroupToggleSettings = useCallback((action, flag) => dispatch(action(flag)), [dispatch]);

  const callbackForInputNumberSettings = useCallback((action, flag) => dispatch(action(flag)), [dispatch]);

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

  if (isRedirectToLoginPage) {
    return <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: ROUTES.SETTINGS } }} />;
  }

  if (isPageInitialized) {
    return (
      <div className={classes.pageWrapper}>
        <Menu />
        <div className={classes.componentsWrapper}>
          <div className={classes.settingsContainer}>
            <div className={classes.settingsGroupContainer}>
              <h3 className={classes.settingsPageTitle}>Settings for card</h3>
              {numberInputSettingsConfig.map(({ settingString, action, settingName, minValue, maxValue }) => {
                return (
                  <div key={settingString} className={classes.settingWrapper}>
                    <InputNumber
                      inputChange={callbackForInputNumberSettings}
                      defaultState={Number.parseInt(settings[settingName])}
                      action={action}
                      min={minValue}
                      max={maxValue}
                    />
                    <div className={classes.settingSentence}>{settingString}</div>
                  </div>
                );
              })}
            </div>
            <div className={classes.settingsGroupContainer}>
              <h3 className={classes.settingsPageTitle}>Settings for card</h3>
              {singleToggleSettingsConfig.map(({ settingString, action, settingName }) => {
                return (
                  <div key={settingString} className={classes.settingWrapper}>
                    <Toggle
                      toggleClick={callbackForNoGroupToggleSettings}
                      defaultState={settings[settingName]}
                      action={action}
                    />
                    <div className={classes.settingSentence}>{settingString}</div>
                  </div>
                );
              })}
            </div>
            <div className={classes.settingsGroupContainer}>
              <h3 className={classes.settingsPageTitle}>Settings for card</h3>
              {groupToggleForCardSettingsConfig.map(({ settingString, action, settingName }) => {
                return (
                  <div key={settingName} className={classes.settingWrapper}>
                    <Toggle
                      settingName={settingName}
                      toggleClick={callbackForGroupToggleCardSettings}
                      defaultState={settings[settingName]}
                      action={action}
                    />
                    <div className={classes.settingSentence}>{settingString}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Loading />;
};
