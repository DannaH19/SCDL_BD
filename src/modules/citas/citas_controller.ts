import { Request, Response, NextFunction } from 'express';
import { CitaService } from './citas_service';

const service = new CitaService();

export class CitaController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Capturamos tanto pacienteId como medicoId de la URL (?pacienteId=X o ?medicoId=Y)
      const { pacienteId, medicoId } = req.query;

      if (pacienteId) {
        // Filtra por paciente
        res.json(await service.getByPaciente(Number(pacienteId)));
      } else if (medicoId) {
        // Filtra por médico
        res.json(await service.getByMedico(Number(medicoId)));
      } else {
        // Si no hay filtros, trae todo (Admin)
        res.json(await service.getAll());
      }
    } catch (e) { 
      next(e); 
    }
  }

  async getByPaciente(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.getByPaciente(+req.params.pacienteId)); } catch (e) { next(e); }
  }

  async getByMedico(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.getByMedico(+req.params.medicoId)); } catch (e) { next(e); }
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

  async cancelar(req: Request, res: Response, next: NextFunction) {
    try { res.json(await service.cancelar(+req.params.id)); } catch (e) { next(e); }
  }
}