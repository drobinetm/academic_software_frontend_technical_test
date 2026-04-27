export const formatDateForInput = (value) => {
  if (!value) {
    return '';
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

  return new Date(`${value}T00:00:00`).toISOString();
};
