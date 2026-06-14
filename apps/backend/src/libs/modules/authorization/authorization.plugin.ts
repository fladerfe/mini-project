import { HTTPCode, HTTPError } from '@thread-js/shared';
import { type FastifyInstance } from 'fastify';

import { jwt } from '../jwt/jwt.js';

const WHITE_LIST = new Set(['/api/v1/auth/sign-in', '/api/v1/auth/sign-up']);

class AuthorizationPlugin {
  public register(app: FastifyInstance): void {
    app.addHook('preHandler', request => {
      if (WHITE_LIST.has(request.url)) {
        return;
      }

      const { authorization } = request.headers;

      if (!authorization) {
        throw new HTTPError({
          message:
            'You do not have the necessary authorization to access this resource. Please log in.',
          status: HTTPCode.UNAUTHORIZED
        });
      }

      try {
        const token = authorization.replace('Bearer ', '');

        const payload = jwt.verifyToken(token);

        request.user = {
          id: payload.id
        };
      } catch {
        throw new HTTPError({
          message:
            'You do not have the necessary authorization to access this resource. Please log in.',
          status: HTTPCode.UNAUTHORIZED
        });
      }
    });
  }
}

export { AuthorizationPlugin };
