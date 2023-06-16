import { NextFunction, Request, Response } from 'express';
import * as Jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string || 'jwt_secret';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { id } = await Jwt.verify(authorization, secret) as { id: string };
    req.body.id = id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
export default tokenValidation;
