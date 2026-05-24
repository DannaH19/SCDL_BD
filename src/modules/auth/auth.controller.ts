import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { loginSchema, registerSchema } from './auth.schema';

const service = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await service.login(data);
    return res.status(200).json(result);
  } catch (error: any) {
    if (error.message === 'Credenciales incorrectas') {
      return res.status(401).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await service.register(data);
    return res.status(201).json({ message: 'Usuario creado correctamente.', result });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};