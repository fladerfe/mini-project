import jsonwebtoken from 'jsonwebtoken';

import { type JWTService } from './libs/types/types.js';

type Constructor = {
  secret: string;
};

class JWT implements JWTService {
  #secret: string;

  public constructor({ secret }: Constructor) {
    this.#secret = secret;
  }

  public generateToken(userId: number): string {
    return jsonwebtoken.sign({ id: userId }, this.#secret, { expiresIn: '1d' });
  }

  public verifyToken(token: string): { id: number } {
    return jsonwebtoken.verify(token, this.#secret) as { id: number };
  }
}

export { JWT };
