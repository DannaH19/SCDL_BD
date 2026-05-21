import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Error de validación.',
      // CAMBIO AQUÍ: Cambiamos err.errors por err.issues
      errors: err.issues.map((e) => ({
        campo: e.path.join('.'),
        mensaje: e.message,
      })),
    });
    return;
  }
  
  if (err instanceof Error) {
    console.error('❌', err.message);
    res.status(500).json({ message: err.message || 'Error interno del servidor.' });
    return;
  }
  
  res.status(500).json({ message: 'Error desconocido.' });
};