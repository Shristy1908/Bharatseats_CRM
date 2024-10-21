export const checkAuthExist = () => {
  // need to change this code;
  const userData = "";
  if (userData) {
    const expiryDate = userData.token.validTo;
    if (expiryDate) {
      const date = new Date(expiryDate);
      const now = new Date();
      if (date > now) {
        return true;
      }
      sessionStorage.removeItem("IsLoggedIn");
      return false;
    }
    sessionStorage.removeItem("IsLoggedIn");
    return false;
  }
  sessionStorage.removeItem("IsLoggedIn");
  return false;
};

export const setSessionStorage = (key, data) => {
  // const encryptedData = encryptData(data);
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getSessionStorage = (key) => {
  const storedObject = sessionStorage.getItem(key);
  return storedObject ? JSON.parse(storedObject) : null;
};
