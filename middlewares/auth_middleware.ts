import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { AuthRequest } from '../shared/types/auth-request';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado.' });
    return;
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET) as AuthRequest['user'];
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};