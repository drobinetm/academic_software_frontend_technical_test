export const formatDateForInput = (value) => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    const dateOnlyMatch = value.match(/^(\d{4}-\d{2}-\d{2})/);

    if (dateOnlyMatch) {
      return dateOnlyMatch[1];
    }
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return parsedDate.toISOString().slice(0, 10);
};

export const serializeDateForApi = (value) => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    const dateOnlyMatch = value.match(/^(\d{4}-\d{2}-\d{2})$/);

    if (dateOnlyMatch) {
      return dateOnlyMatch[1];
    }
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return parsedDate.toISOString().slice(0, 10);
};
