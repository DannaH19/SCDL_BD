import { Request, Response, NextFunction } from 'express';
import { ConsultorioService } from './consultorios_service';

const service = new ConsultorioService();

export class ConsultorioController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.getAll()); } catch (e) { next(e); }
  }
  async getBySede(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.getBySede(+req.params.sedeId)); } catch (e) { next(e); }
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