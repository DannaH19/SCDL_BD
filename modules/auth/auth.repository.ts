import Usuario from './auth.model';

export class AuthRepository {
  findByUsername(username: string) {
    return Usuario.findOne({
      where: { username, estado_u: true },
    });
  }

  updateUltimoAcceso(id: number) {
    return Usuario.update(
      { ulti_acceso: new Date() },
      { where: { Id_Usuario: id } }
    );
  }
}