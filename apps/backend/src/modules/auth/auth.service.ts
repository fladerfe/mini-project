import { HTTPCode, HTTPError } from '@thread-js/shared';

import { type UserService } from '../user/user.js';
import {
  type AuthService,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './libs/types/types.js';

type Constructor = {
  userService: UserService;
};

class Auth implements AuthService {
  #userService: UserService;

  public register = async (
    userRequestDto: UserSignUpRequestDto
  ): Promise<UserSignUpResponseDto> => {
    return await this.#userService.create(userRequestDto);
  };

  public signIn = async (
    payload: UserSignInRequestDto
  ): Promise<UserSignInResponseDto> => {
    const user = await this.#userService.getByEmailWithPassword(payload)

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

    const { password, ...userWithoutPassword } = user;

    return {
      token: `token from ${JSON.stringify({ id: user.id })}`,
      user: userWithoutPassword
    }
  }

  public constructor({ userService }: Constructor) {
    this.#userService = userService;
  }
}

export { Auth };
