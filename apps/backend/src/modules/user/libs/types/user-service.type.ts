import { type UserSignInRequestDto, type UserSignUpRequestDto } from '~/modules/auth/libs/types/types.js';

import { type User } from './types.js';

type UserService = {
  create(payload: UserSignUpRequestDto): Promise<User>;
  getByEmailWithPassword(payload: UserSignInRequestDto): Promise<User>;
};

export { type UserService };
