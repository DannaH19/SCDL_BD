import { Request, Response, NextFunction } from 'express';
import { PacienteService } from './pacientes_service';

const service = new PacienteService();

export class PacienteController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getAll();
      res.json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES:', e.message); // ← muestra el error real
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getById(Number(req.params.id));
      res.json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES ID:', e.message);
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.create(req.body);
      res.status(201).json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES CREATE:', e.message);
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.update(Number(req.params.id), req.body);
      res.json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES UPDATE:', e.message);
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.delete(Number(req.params.id));
      res.json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES DELETE:', e.message);
      next(e);
    }
  }
}