const extractMessageFromPayload = (payload) => {
  if (!payload) {
    return '';
  }

  if (typeof payload === 'string') {
    if (payload.includes('<!DOCTYPE html>') || payload.includes('<html')) {
      return '';
    }

    return payload;
  }

  if (typeof payload.message === 'string') {
    return payload.message;
  }

  if (typeof payload.title === 'string') {
    return payload.title;
  }

  if (typeof payload.error === 'string') {
    return payload.error;
  }

  if (typeof payload.detail === 'string') {
    return payload.detail;
  }

  if (typeof payload.Detail === 'string') {
    return payload.Detail;
  }

  if (Array.isArray(payload.errors)) {
    return payload.errors.join(', ');
  }

  if (payload.errors && typeof payload.errors === 'object') {
    const firstEntry = Object.values(payload.errors).find((value) => Array.isArray(value) && value.length);
    if (firstEntry) {
      return firstEntry[0];
    }

    const firstStringEntry = Object.values(payload.errors).find((value) => typeof value === 'string' && value);
    if (firstStringEntry) {
      return firstStringEntry;
    }
  }

  return '';
};

export const getApiErrorMessage = (error, fallbackMessage) => {
  const responseMessage = extractMessageFromPayload(error?.response?.data);
  const responseStatus = error?.response?.status;

   if (typeof error?.response?.data === 'string' && (error.response.data.includes('<!DOCTYPE html>') || error.response.data.includes('<html'))) {
    return 'El servicio devolvio una respuesta inesperada. Intenta nuevamente en unos momentos.';
  }

  if (responseMessage) {
    return responseMessage;
  }

  if (error?.message === 'Network Error' || (!error?.response && error?.request)) {
    return 'No fue posible conectar con el servicio. Intenta nuevamente en unos momentos.';
  }

  if (responseStatus >= 500) {
    return 'Ocurrio un problema interno al procesar la solicitud. Intenta nuevamente en unos momentos.';
  }

  if (error?.message) {
    return fallbackMessage;
  }

  return fallbackMessage;
};
