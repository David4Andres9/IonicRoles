import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const TOKEN_KEY = 'authToken';

export const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const isTokenExpired = () => {
    const token = getToken();
    if (!token) {
      return true;
    }
  
    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }
    const expirationTime = decodedToken.exp * 1000;

    return Date.now() > expirationTime;
};

const decodeToken = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error(error);
      return null;
    }
  };
export const decodeRole = () => {
  const newToken = getToken();
  if (newToken != null){
    const decodedToken = decodeToken(newToken);
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

};
export const useClearTokenOnUnmount = () => {
  useEffect(() => {
    return () => {
      removeToken();
    };
  }, []);
};

export const checkTokenAndRedirect = () => {
    const history = useHistory();
    const tokenExpired = isTokenExpired();
  
    if (tokenExpired) {
      history.replace("/Login");
    }
  };