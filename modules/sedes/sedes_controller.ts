import { Request, Response, NextFunction } from 'express';
import { SedeService } from './sedes_service';

const service = new SedeService();

export class SedeController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.getAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.getById(+req.params.id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json(await service.create(req.body)); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.update(+req.params.id, req.body)); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.delete(+req.params.id)); } catch (e) { next(e); }
  }
}