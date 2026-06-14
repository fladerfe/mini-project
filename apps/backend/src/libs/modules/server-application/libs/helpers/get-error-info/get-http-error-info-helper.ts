import { type HTTPError } from '@thread-js/shared';

import { ServerErrorType } from '~/libs/enums/enums.js';

import { type ErrorInfo } from '../../types/types.js';

const getHTTPErrorInfo = (error: HTTPError): ErrorInfo => {
  return {
    internalMessage: error.message,
    response: {
      errorType: ServerErrorType.COMMON,
      message: error.message
    },
    status: error.status
  };
};

export { getHTTPErrorInfo };
