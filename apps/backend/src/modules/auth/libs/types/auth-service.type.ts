import {
  type User,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './types.js';

type AuthService = {
  getCurrent(_id: number): Promise<User>;
  register(_user: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;
  signIn(_user: UserSignInRequestDto): Promise<UserSignInResponseDto>;
};

export { type AuthService };
