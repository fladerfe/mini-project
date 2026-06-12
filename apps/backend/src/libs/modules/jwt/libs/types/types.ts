type JWTPayload = {
  id: number;
};

type JWTService = {
  generateToken(userId: number): string;
  verifyToken(token: string): JWTPayload;
};

export { type JWTService };
