export const readStorageValue = (key, fallback = null) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ?? fallback;
  } catch (error) {
    return fallback;
  }
};

export const writeStorageValue = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    return null;
  }

  return value;
};

export const removeStorageValue = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    return null;
  }

  return null;
};

export const readStorageJson = (key, fallback = null) => {
  const value = readStorageValue(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

export const writeStorageJson = (key, value) => writeStorageValue(key, JSON.stringify(value));
