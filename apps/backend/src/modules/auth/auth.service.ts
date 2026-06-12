import { HTTPCode, HTTPError } from '@thread-js/shared';

import { type JWTService } from '~/libs/modules/jwt/jwt.js';

import { type UserService } from '../user/user.js';
import {
  type AuthService,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './libs/types/types.js';

type Constructor = {
  jwt: JWTService;
  userService: UserService;
};

class Auth implements AuthService {
  #userService: UserService;
  #jwt: JWTService;

  public register = async (
    userRequestDto: UserSignUpRequestDto
  ): Promise<UserSignUpResponseDto> => {
    const user = await this.#userService.create(userRequestDto);

    return {
      token: this.#jwt.generateToken(user.id),
      user
    };
  };

  public signIn = async (
    payload: UserSignInRequestDto
  ): Promise<UserSignInResponseDto> => {
    const user = await this.#userService.getByEmailWithPassword(payload);

    if (!user) {
      throw new HTTPError({
        message: 'User not found',
        status: HTTPCode.NOT_FOUND
      });
    }

    if (user.password !== payload.password) {
      throw new HTTPError({
        message: 'Login failed. Invalid Email or Password',
        status: HTTPCode.UNPROCESSED_ENTITY
      });
    }

    const token = this.#jwt.generateToken(user.id);

    return {
      token,
      user
    };
  };

  public constructor({ jwt, userService }: Constructor) {
    this.#jwt = jwt;
    this.#userService = userService;
  }
}

export { Auth };
