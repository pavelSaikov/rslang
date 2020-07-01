export const ERROR_MESSAGE = {
  INVALID_ACCESS_TOKEN: 'Access Token Is Missing or Invalid',
  BAD_REQUEST: 'Bad Request',
  SETTINGS_NOT_FOUND: 'Settings Not Found',
};

export const ERROR_MESSAGES = Object.keys(ERROR_MESSAGE).map(key => ERROR_MESSAGE[key]);

export const ERROR_MESSAGES_RESPONSE_STATUS_MAP = new Map([
  [400, ERROR_MESSAGE.BAD_REQUEST],
  [401, ERROR_MESSAGE.INVALID_ACCESS_TOKEN],
  [404, ERROR_MESSAGE.SETTINGS_NOT_FOUND],
]);
