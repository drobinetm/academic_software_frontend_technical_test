import { z } from 'zod';

const requiredText = (label) => z.string().trim().min(1, `${label} es obligatorio.`);

export const loginSchema = z.object({
  username: requiredText('El usuario'),
  password: requiredText('La contraseña'),
});

export const registerSchema = z.object({
  username: requiredText('El usuario'),
  email: z.string().trim().min(1, 'El correo es obligatorio.').email('Ingresa una dirección de correo válida.'),
  password: z
    .string()
    .min(9, 'La contraseña debe contener más de 8 caracteres.')
    .max(20, 'La contraseña debe contener como máximo 20 caracteres.')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'La contraseña debe incluir mayúsculas, minúsculas y un número.'),
});

export const customerSchema = z.object({
  nombre: requiredText('El nombre').max(50, 'El nombre debe contener como máximo 50 caracteres.'),
  apellidos: requiredText('Los apellidos').max(100, 'Los apellidos deben contener como máximo 100 caracteres.'),
  identificacion: requiredText('La identificación').max(20, 'La identificación debe contener como máximo 20 caracteres.'),
  telefonoCelular: requiredText('El teléfono celular').max(20, 'El teléfono celular debe contener como máximo 20 caracteres.'),
  otroTelefono: requiredText('El otro teléfono').max(20, 'El otro teléfono debe contener como máximo 20 caracteres.'),
  direccion: requiredText('La dirección').max(200, 'La dirección debe contener como máximo 200 caracteres.'),
  fNacimiento: requiredText('La fecha de nacimiento').refine((value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()), 'Ingresa una fecha de nacimiento válida.'),
  fAfiliacion: requiredText('La fecha de afiliación').refine((value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()), 'Ingresa una fecha de afiliación válida.'),
  sexo: z.enum(['M', 'F'], { message: 'Selecciona un género válido.' }),
  resenaPersonal: requiredText('La reseña').max(200, 'La reseña debe contener como máximo 200 caracteres.'),
  imagen: z.string().optional(),
  interesId: z.string().trim().min(1, 'Selecciona un interés válido.'),
});

export const getValidationErrors = (schema, values) => {
  const result = schema.safeParse(values);

  if (result.success) {
    return {};
  }

  const flattened = result.error.flatten().fieldErrors;

  return Object.keys(flattened).reduce((accumulator, key) => {
    const [message] = flattened[key] || [];

    if (message) {
      accumulator[key] = message;
    }

    return accumulator;
  }, {});
};
