import { ENDPOINT } from '../services.models';
import { ERROR_MESSAGES_RESPONSE_STATUS_MAP } from './StatisticsService.models';

export class StatisticsService {
  constructor() {
    this.endpoint = ENDPOINT;
  }

  getUserStatistics({ token, userId, controller }) {
    return fetch(`${this.endpoint}/users/${userId}/statistics`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
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
      .then(({ optional: { statistics } }) => JSON.parse(statistics))
      .catch(e => {
        throw new Error(e.message);
      });
  }

  updateStatistics({ token, userId, statistics, controller }) {
    const optionalMock = { statistics: JSON.stringify(statistics) };

    return fetch(`${this.endpoint}/users/${userId}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ learnedWords: 0, optional: optionalMock }),
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

export const statisticsService = new StatisticsService();
