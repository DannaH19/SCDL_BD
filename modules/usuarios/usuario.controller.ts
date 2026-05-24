import { Request, Response } from 'express';
import { UsuarioService } from './usuario.service';
import { createUsuarioSchema, updateUsuarioSchema } from './usuario.schema';

const service = new UsuarioService();

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await service.getAll());
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuarioById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    return res.status(200).json(await service.getById(+req.params.id));
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const data = createUsuarioSchema.parse(req.body);
    return res.status(201).json(await service.create(data));
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateUsuario = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const data = updateUsuarioSchema.parse(req.body);
    return res.status(200).json(await service.update(+req.params.id, data));
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteUsuario = async (req: Request<{ id: string }>, res: Response) => {
  try {
    return res.status(200).json(await service.desactivar(+req.params.id));
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
