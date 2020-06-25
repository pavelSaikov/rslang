import { MAXIMUM_TOKEN_AGE, INCORRECT_EMAIL_OR_PASSWORD_MESSAGE } from './AuthorizationService.models';
import { ENDPOINT } from '../services.models';

export class AuthorizationService {
  constructor() {
    this.endpoint = ENDPOINT;
  }

  signIn({ email, password, controller }) {
    return fetch(`${this.endpoint}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      signal: controller.signal,
    })
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw new Error(INCORRECT_EMAIL_OR_PASSWORD_MESSAGE);
      })
      .then(response => response.json())
      .then(({ token, userId }) => ({ token, userId, creationDate: Date.now() }))
      .catch(e => {
        throw new Error(e.message);
      });
  }

  register({ email, password, controller }) {
    return fetch(`${this.endpoint}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      signal: controller.signal,
    })
      .then(response => response.json())
      .then(() => ({ email, password }))
      .catch(() => {
        throw new Error('User with this email is already exists');
      });
  }

  checkIsAuthorizationTokenValid({ creationDate }) {
    const currentDate = Date.now();
    const tokenAge = currentDate - creationDate;

    return tokenAge <= MAXIMUM_TOKEN_AGE;
  }
}

export const authorizationService = new AuthorizationService();
