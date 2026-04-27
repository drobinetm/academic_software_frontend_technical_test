import { formatDateForInput, serializeDateForApi } from '../../utils/date';

export const createEmptyCustomerForm = () => ({
  id: '',
  nombre: '',
  apellidos: '',
  identificacion: '',
  telefonoCelular: '',
  otroTelefono: '',
  direccion: '',
  fNacimiento: '',
  fAfiliacion: '',
  sexo: '',
  resenaPersonal: '',
  imagen: '',
  interesId: '',
});

export const mapCustomerDetailToForm = (customerDetail) => ({
  id: customerDetail?.id || '',
  nombre: customerDetail?.nombre || '',
  apellidos: customerDetail?.apellidos || '',
  identificacion: customerDetail?.identificacion || '',
  telefonoCelular: customerDetail?.telefonoCelular || '',
  otroTelefono: customerDetail?.otroTelefono || '',
  direccion: customerDetail?.direccion || '',
  fNacimiento: formatDateForInput(customerDetail?.fNacimiento),
  fAfiliacion: formatDateForInput(customerDetail?.fAfiliacion),
  sexo: customerDetail?.sexo || '',
  resenaPersonal: customerDetail?.resenaPersonal || '',
  imagen: customerDetail?.imagen || '',
  interesId: customerDetail?.interesesId || '',
});

export const mapCustomerFormToCreatePayload = (values, usuarioId) => ({
  nombre: values.nombre.trim(),
  apellidos: values.apellidos.trim(),
  identificacion: values.identificacion.trim(),
  celular: values.telefonoCelular.trim(),
  otroTelefono: values.otroTelefono.trim(),
  direccion: values.direccion.trim(),
  fNacimiento: serializeDateForApi(values.fNacimiento),
  fAfiliacion: serializeDateForApi(values.fAfiliacion),
  sexo: values.sexo,
  resennaPersonal: values.resenaPersonal.trim(),
  imagen: values.imagen || null,
  interesFK: values.interesId,
  usuarioId,
});

export const mapCustomerFormToUpdatePayload = (values, usuarioId) => ({
  id: values.id,
  nombre: values.nombre.trim(),
  apellidos: values.apellidos.trim(),
  identificacion: values.identificacion.trim(),
  celular: values.telefonoCelular.trim(),
  otroTelefono: values.otroTelefono.trim(),
  direccion: values.direccion.trim(),
  fNacimiento: serializeDateForApi(values.fNacimiento),
  fAfiliacion: serializeDateForApi(values.fAfiliacion),
  sexo: values.sexo,
  resennaPersonal: values.resenaPersonal.trim(),
  imagen: values.imagen || null,
  interesFK: values.interesId,
  usuarioId,
});

export const getCustomerFullName = (customer) => [customer?.nombre, customer?.apellidos].filter(Boolean).join(' ');
