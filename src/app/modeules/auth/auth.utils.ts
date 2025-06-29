import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string,name:string,email:string },
  secret: jwt.Secret,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, <jwt.SignOptions>{
    expiresIn: expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};