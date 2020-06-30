const { ENDPOINT } = require('../services.models');

class SettingsService {
  constructor() {
    this.endpoint = ENDPOINT;
  }

  getUserSettings({ token, userId, controller }) {
    return fetch(`${this.endpoint}/users/${userId}/settings`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    })
      .then(response => response.json())
      .then(({ optional }) => optional)
      .catch(() => {
        throw new Error('Can not get user settings from backend');
      });
  }

  setUserSettings({ token, userId, controller, settings }) {
    return fetch(`${this.endpoint}/users/${userId}/settings`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wordsPerDay: 1, optional: settings }),
      signal: controller.signal,
    }).catch(() => {
      throw new Error('Can not update user settings in backend');
    });
  }
}

export const settingsService = new SettingsService();
