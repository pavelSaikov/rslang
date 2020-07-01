import { ERROR_MESSAGES_RESPONSE_STATUS_MAP } from './SettingsService.models';

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
      .then(response => {
        if (!response.ok) {
          throw new Error(ERROR_MESSAGES_RESPONSE_STATUS_MAP.get(response.status));
        }

        return response;
      })
      .then(response => response.json())
      .then(({ optional }) => optional)
      .catch(e => {
        throw new Error(e.message);
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
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(ERROR_MESSAGES_RESPONSE_STATUS_MAP.get(response.status));
        }

        return response;
      })
      .catch(e => {
        throw new Error(e.message);
      });
  }
}

export const settingsService = new SettingsService();
