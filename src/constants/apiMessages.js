export const BACKEND_MESSAGE_TRANSLATIONS = {
  unauthorized: 'No autorizado.',
  forbidden: 'Acceso denegado.',
  'not found': 'No encontrado.',
  'bad request': 'Solicitud incorrecta.',
  'internal server error': 'Error interno del servidor.',
  'validation error': 'Error de validación.',
  'invalid credentials': 'Credenciales inválidas.',
  'invalid username or password': 'Usuario o contraseña inválidos.',
  'user not found': 'Usuario no encontrado.',
  'token expired': 'La sesión ha expirado.',
  'token is invalid': 'El token no es válido.',
  'email already exists': 'El correo electrónico ya existe.',
  'username already exists': 'El nombre de usuario ya existe.',
};

export const BACKEND_FIELD_LABELS = {
  fNacimiento: 'Fecha de nacimiento',
  fAfiliacion: 'Fecha de afiliación',
  nombre: 'Nombre',
  apellidos: 'Apellidos',
  identificacion: 'Identificación',
  celular: 'Teléfono celular',
  otroTelefono: 'Teléfono alterno',
  direccion: 'Dirección',
  sexo: 'Género',
  resennaPersonal: 'Reseña personal',
  imagen: 'Imagen',
  interesFK: 'Interés',
  usuarioId: 'Usuario',
};

export const BACKEND_VALIDATION_MESSAGE_TRANSLATIONS = {
  'datetimes provided to dates should have zero time - e.g. be exact dates': 'debe enviarse como una fecha exacta, sin hora.',
  'field required': 'es obligatorio.',
  'input should be a valid date': 'debe contener una fecha válida.',
  'input should be a valid string': 'debe contener un texto válido.',
  'string should have at least 1 character': 'es obligatorio.',
};
