export const WORDS_PER_PAGE = 10;
export const DEFAULT_WORDS_PER_PAGE = 20;
export const DEFAULT_PAGES_IN_EACH_GROUP = 30;
export const DEFAULT_GROUPS_NUMBER = 6;

export const ERROR_MESSAGE = {
  INVALID_ACCESS_TOKEN: 'Access Token Is Missing or Invalid',
  BAD_REQUEST: 'Bad Request',
  USER_NOT_FOUND: 'User Not Found',
};

export const ERROR_MESSAGES = Object.keys(ERROR_MESSAGE).map(key => ERROR_MESSAGE[key]);

export const ERROR_MESSAGES_RESPONSE_STATUS_MAP = new Map([
  [400, ERROR_MESSAGE.BAD_REQUEST],
  [401, ERROR_MESSAGE.INVALID_ACCESS_TOKEN],
  [404, ERROR_MESSAGE.USER_NOT_FOUND],
]);
