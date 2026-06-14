import { HTTPError } from '@thread-js/shared';

import { type APIPath } from '~/libs/enums/enums.js';
import {
  Controller,
  type ControllerAPIHandler,
  type ControllerAPIHandlerOptions,
  type ControllerAPIHandlerResponse
} from '~/libs/modules/controller/controller.js';
import { HTTPCode, HTTPMethod } from '~/libs/modules/http/http.js';
import { type LoggerModule } from '~/libs/modules/logger/logger.js';
import { type ValueOf } from '~/libs/types/types.js';

import { AuthApiPath } from './libs/enums/enums.js';
import {
  type AuthController,
  type AuthService,
  type User,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './libs/types/types.js';
import {
  signInValidationSchema,
  signUpValidationSchema
} from './libs/validation-schemas/validation-schemas.js';

type Constructor = {
  apiPath: ValueOf<typeof APIPath>;
  authService: AuthService;
  logger: LoggerModule;
};

class Auth extends Controller implements AuthController {
  #authService: AuthService;

  public register = async (
    options: ControllerAPIHandlerOptions<{
      body: UserSignUpRequestDto;
    }>
  ): Promise<ControllerAPIHandlerResponse<UserSignUpResponseDto>> => {
    return {
      payload: await this.#authService.register(options.body),
      status: HTTPCode.CREATED
    };
  };

  public signIn = async (
    options: ControllerAPIHandlerOptions<{
      body: UserSignInRequestDto;
    }>
  ): Promise<ControllerAPIHandlerResponse<UserSignInResponseDto>> => {
    return {
      payload: await this.#authService.signIn(options.body),
      status: HTTPCode.OK
    };
  };

  public getCurrent = async (
    options: ControllerAPIHandlerOptions<{
      user: {
        id: number;
      };
    }>
  ): Promise<ControllerAPIHandlerResponse<User>> => {
    if (!options.user) {
      throw new HTTPError({
        message: 'Unauthorized',
        status: HTTPCode.UNAUTHORIZED
      });
    }

    return {
      payload: await this.#authService.getCurrent(options.user.id),
      status: HTTPCode.OK
    };
  };

  public constructor({ apiPath, authService, logger }: Constructor) {
    super({ apiPath, logger });
    this.#authService = authService;

    this.addRoute({
      handler: this.getCurrent as ControllerAPIHandler,
      method: HTTPMethod.GET,
      url: AuthApiPath.CURRENT
    });

    this.addRoute({
      handler: this.signIn as ControllerAPIHandler,
      method: HTTPMethod.POST,
      schema: {
        body: signInValidationSchema
      },
      url: AuthApiPath.SIGN_IN
    });

    this.addRoute({
      handler: this.register as ControllerAPIHandler,
      method: HTTPMethod.POST,
      schema: {
        body: signUpValidationSchema
      },
      url: AuthApiPath.SIGN_UP
    });
  }
}

export { Auth };
