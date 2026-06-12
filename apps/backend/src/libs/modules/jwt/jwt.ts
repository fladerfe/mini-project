import { config } from '../config/config.js';
import { JWT } from './jwt.service.js';

const jwt = new JWT({
  secret: config.ENV.JWT.SECRET
});

export { jwt };
export { type JWTService } from './libs/types/types.js';
