export const encryptStringData = (data) => {
  try {
    const encodedStringBtoA = btoa(data);
    return encodedStringBtoA;
  } catch (err) {
    return null;
  }
};