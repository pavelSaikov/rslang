import { MAXIMUM_TOKEN_AGE } from './AuthorizationService.models';

export class AuthorizationService {
  constructor() {
    this.endpoint = 'https://afternoon-falls-25894.herokuapp.com';
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
      .then(response => response.json())
      .then(({ token, userId }) => ({ token, userId }))
      .catch(() => {
        throw new Error('Email or password incorrect');
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
      .then(() => ({ email, password, creationDate: Date.now() }))
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
