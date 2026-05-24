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

  create(data: {
    username:   string;
    contraseña: string;
    Nom_comp:   string;
    correo_u:   string | null;
    telefono_u: string | null;
    ID_rol:     number;
    estado_u:   boolean;
  }) {
    return Usuario.create(data as any);
  }
}