import { HTTPCode, HTTPError } from '@thread-js/shared';

import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto
} from '../auth/libs/types/types.js';
import { type User as TUser, type UserService } from './libs/types/types.js';
import { type User as UserRepository } from './user.repository.js';

type Constructor = Record<'userRepository', UserRepository>;

class User implements UserService {
  #userRepository: UserRepository;

  public constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  public async create(payload: UserSignUpRequestDto): Promise<TUser> {
    const existingUser = await this.#userRepository.getByEmail(payload.email);

    if (existingUser) {
      throw new HTTPError({
        message: 'User with this email already exists',
        status: HTTPCode.UNPROCESSED_ENTITY
      });
    }

    const user = await this.#userRepository.create(payload);

    return user;
  }

  public getByEmailWithPassword(payload: UserSignInRequestDto): Promise<TUser> {
    return this.#userRepository.getByEmailWithPassword(
      payload.email
    ) as Promise<TUser>;
  }
}

export { User };
