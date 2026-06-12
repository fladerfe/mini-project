import { type User } from './user.type.js';

type UserSignInResponseDto = {
  token: string;
  user: User;
};

type UserSignUpResponseDto = {
  token: string;
  user: User;
};

export { type UserSignInResponseDto, type UserSignUpResponseDto };
