import { HTTPError } from '@thread-js/shared';

import { type APIError, type ErrorInfo } from '../../types/types.js';
import { getDefaultErrorInfo } from './get-default-error-info.helper.js';
import { getHTTPErrorInfo } from './get-http-error-info-helper.js';
import { getValidationErrorInfo } from './get-validation-error-info.helper.js';

const getErrorInfo = (error: APIError): ErrorInfo => {
  if ('isJoi' in error) {
    return getValidationErrorInfo(error);
  }

  if (error instanceof HTTPError) {
    return getHTTPErrorInfo(error);
  }

  return getDefaultErrorInfo(error);
};

export { getErrorInfo };
