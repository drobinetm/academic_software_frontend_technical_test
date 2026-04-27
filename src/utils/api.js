import {
  BACKEND_FIELD_LABELS,
  BACKEND_MESSAGE_TRANSLATIONS,
  BACKEND_VALIDATION_MESSAGE_TRANSLATIONS,
} from '../constants/apiMessages';

const translateBackendMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return message;
  }

  const normalizedMessage = message.trim().toLowerCase();

  return BACKEND_MESSAGE_TRANSLATIONS[normalizedMessage] || message;
};

const formatValidationError = (validationError) => {
  if (!validationError || typeof validationError !== 'object') {
    return '';
  }

  const fieldKey = Array.isArray(validationError.loc)
    ? validationError.loc[validationError.loc.length - 1]
    : '';
  const fieldLabel = BACKEND_FIELD_LABELS[fieldKey] || fieldKey;
  const normalizedMessage = typeof validationError.msg === 'string'
    ? validationError.msg.trim().toLowerCase()
    : '';
  const translatedMessage = BACKEND_VALIDATION_MESSAGE_TRANSLATIONS[normalizedMessage]
    || translateBackendMessage(validationError.msg);

  if (!translatedMessage) {
    return fieldLabel || '';
  }

  if (!fieldLabel) {
    return translatedMessage;
  }

  if (/^(es |debe )/i.test(translatedMessage)) {
    return `${fieldLabel} ${translatedMessage}`;
  }

  return `${fieldLabel}: ${translatedMessage}`;
};

const extractValidationErrors = (payload) => {
  if (!Array.isArray(payload?.errors)) {
    return '';
  }

  const messages = payload.errors
    .map((validationError) => formatValidationError(validationError))
    .filter(Boolean);

  return [...new Set(messages)].join(' ');
};

const extractMessageFromPayload = (payload) => {
  if (!payload) {
    return '';
  }

  if (typeof payload === 'string') {
    if (payload.includes('<!DOCTYPE html>') || payload.includes('<html')) {
      return '';
    }

    return translateBackendMessage(payload);
  }

  const validationMessage = extractValidationErrors(payload);
  if (validationMessage) {
    return validationMessage;
  }

  if (typeof payload.message === 'string') {
    return translateBackendMessage(payload.message);
  }

  if (typeof payload.title === 'string') {
    return translateBackendMessage(payload.title);
  }

  if (typeof payload.error === 'string') {
    return translateBackendMessage(payload.error);
  }

  if (typeof payload.detail === 'string') {
    return translateBackendMessage(payload.detail);
  }

  if (typeof payload.Detail === 'string') {
    return translateBackendMessage(payload.Detail);
  }

  if (Array.isArray(payload.errors)) {
    return payload.errors.map((errorItem) => translateBackendMessage(errorItem)).filter(Boolean).join(', ');
  }

  if (payload.errors && typeof payload.errors === 'object') {
    const firstEntry = Object.values(payload.errors).find((value) => Array.isArray(value) && value.length);
    if (firstEntry) {
      return firstEntry[0];
    }

    const firstStringEntry = Object.values(payload.errors).find((value) => typeof value === 'string' && value);
    if (firstStringEntry) {
      return translateBackendMessage(firstStringEntry);
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
