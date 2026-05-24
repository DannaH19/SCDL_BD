import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validate =
  (schema: ZodType) => 
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json({
        message: 'Datos inválidos',
        errors: result.error.issues.map((e) => ({
          campo: e.path.join('.'),
          mensaje: e.message,
        })),
      });
      return;
    }

    req.body = result.data;
    next();
  };