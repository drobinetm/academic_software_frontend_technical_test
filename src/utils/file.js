export const isSupportedImageFile = (file) => {
  if (!file) {
    return false;
  }

  return typeof file.type === 'string' && file.type.startsWith('image/');
};

export const readFileAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo leer la imagen seleccionada.'));
    reader.readAsDataURL(file);
  });
