export enum ErrorMessage {
  MISSING_TOKEN = 'Missing Token',
  UNAUTHORIZED = 'Unauthorized',
  EXPIRED_TOKEN = 'Expired Token',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  IM_A_TEAPOT = "I'm a Teapot",
  BAD_REQUEST = 'Bad Request',
  FAILED_TO_DOWNLOAD = 'Failed to Download',

  LOW_TIER = 'Low Tier',

  INVALID_TOKEN = 'Invalid Token',
  INVALID_ID = 'Invalid ID',
  INVALID_USERNAME = 'Invalid Username',
  USERNAME_ALREADY_EXISTS = 'Username Already Exists',
  INVALID_NICKNAME = 'Invalid Nickname',
  INVALID_EMAIL = 'Invalid Email',
  INVALID_PASSWORD = 'Invalid Password',
  INVALID_FILE = 'Invalid File',
  INVALID_TAGS = 'Invalid Tags',
  INVALID_PRICE = 'Invalid Price',
  INVALID_THUMB = 'Invalid Thumbnail',
  INVALID_SORT = 'Invalid Sort',
  INVALID_TIER = 'Invalid Tier',
  NO_ACCOUNT = 'No Account',

  INCORRECT_PASSWORD = 'Incorrect Password',

  MISSING_EMAIL_OR_USERNAME = 'Missing Email or Username',
  MISSING_TITLE = 'Missing Title',
  MISSING_TEXT = 'Missing Text',
  MISSING_TAGS = 'Missing Tags',
  MISSING_MEDIA = 'Missing Media',
  MISSING_ID = 'Missing ID',
  MISSING_ADMIN = 'Missing Admin',
  MISSING_USERNAME = 'Missing Username',
  MISSING_NAME = 'Missing Name',
  MISSING_PRICE = 'Missing Price',
  MISSING_EMAIL = 'Missing Email',
  MISSING_PASSWORD = 'Missing Password',
  MISSING_VOTE = 'Missing Vote',

  BANNED = 'Banned',

  INTERNAL_SERVER_ERROR = 'Internal Server Error'
}

export function getErrorMessage(error: string) {
  return Object(ErrorMessage)[error] ?? 'Unknown error'
}

export function isCode(error: string, message: ErrorMessage) {
  return getErrorMessage(error) === message
}
