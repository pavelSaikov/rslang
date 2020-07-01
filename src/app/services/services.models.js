export const ENDPOINT = 'https://afternoon-falls-25894.herokuapp.com';
export const ERROR_MESSAGES = {
  INVALID_ACCESS_TOKEN: 'Access Token Is Missing or Invalid',
  INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect Email or Password',
  BAD_REQUEST: 'Bad Request',
  USER_NOT_FOUND: 'User Not Found',
};
export const ERROR_MESSAGES_RESPONSE_STATUS_MAP = new Map([
  [400, ERROR_MESSAGES.BAD_REQUEST],
  [401, ERROR_MESSAGES.INVALID_ACCESS_TOKEN],
  [403, ERROR_MESSAGES.INCORRECT_EMAIL_OR_PASSWORD],
  [404, ERROR_MESSAGES.USER_NOT_FOUND],
]);
