import { Request, Response, NextFunction } from 'express';
import { PacienteService } from './pacientes_service';

const service = new PacienteService();

export class PacienteController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // 💡 Capturamos 'nombre' y el nuevo parámetro 'correo' desde los Query Params
      const { nombre, correo } = req.query;
      let data;

      // 🚀 CASO 1: Filtrado prioritario por Correo Electrónico (Para el Mi Cuenta de Sara)
      if (correo && correo !== 'undefined' && correo !== 'null' && String(correo).trim() !== '') {
        console.log(`[Backend] Buscando paciente con correo: ${correo}`);
        // Llamamos al servicio buscando por correo
        data = await service.getByCorreo(String(correo)); 
      } 
      // 🚀 CASO 2: Filtrado clásico por nombre de usuario (Opcional)
      else if (nombre && nombre !== 'undefined' && nombre !== 'null' && String(nombre).trim() !== '') {
        console.log(`[Backend] Buscando paciente por usuario/nombre: ${nombre}`);
        data = await service.getByUsuario(String(nombre)); 
      } 
      // 🚀 CASO 3: Si eres Admin o no hay filtros, se listan todos los pacientes
      else {
        console.log('[Backend] Listando todos los pacientes (Modo Admin)');
        data = await service.getAll();
      }

      return res.json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES GETALL:', e.message);
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getById(Number(req.params.id));
      return res.json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES ID:', e.message);
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.create(req.body);
      return res.status(201).json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES CREATE:', e.message);
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.update(Number(req.params.id), req.body);
      return res.json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES UPDATE:', e.message);
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.delete(Number(req.params.id));
      return res.json(data);
    } catch (e: any) {
      console.error('ERROR PACIENTES DELETE:', e.message);
      next(e);
    }
  }
}