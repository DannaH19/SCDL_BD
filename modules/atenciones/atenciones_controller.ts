import { Request, Response, NextFunction } from 'express';
import { AtencionService } from './atenciones_service';

const service = new AtencionService();

export class AtencionController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.getAll()); } catch (e) { next(e); }
  }
  async getByTurno(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.getByTurno(+req.params.turnoId)); } catch (e) { next(e); }
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
}