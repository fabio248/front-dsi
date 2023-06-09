import { useState, useEffect, createContext } from 'react';
import { User } from '../api/User.api';
import { ApiAuth } from '../api/Auth.api';
import { hasExpiredToken } from '../utils';

const userController = new User();
const authController = new ApiAuth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Comprueba que el usuario se encuentra con la sesión abierta
    (async () => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();

      if (!accessToken || !refreshToken) {
        logout();
        setLoading(false);
        return;
      }
      //verificar si los tokens no existen o si los tokens estan caducados
      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      setLoading(false);
    })();
  }, []);

  const login = async (accessToken) => {
    try {
      const response = await userController.getUser(accessToken);
      setUser(response);
      setToken(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshAccessToken(
        refreshToken
      );
      authController.setAccessToken(accesToken);
      await login(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };

  if (loading) {
    return null;
  }
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
