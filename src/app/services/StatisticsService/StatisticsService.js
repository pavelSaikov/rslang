import { ENDPOINT } from '../services.models';

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
      .then(response => response.json())
      .then(({ optional: { statistics } }) => JSON.parse(statistics));
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
    });
  }
}

export const statisticsService = new StatisticsService();
