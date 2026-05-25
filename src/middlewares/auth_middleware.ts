import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

interface JwtPayload {
  id: number;
  username: string;
  rol: number;
}

// Extender Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      usuario?: JwtPayload;
    }
  }
}

// Verificar token
export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET as string) as JwtPayload;
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

// Verificar rol
export const verificarRol = (...rolesPermitidos: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ message: 'No tienes permisos para esta acción' });
    }

    next();
  };
};