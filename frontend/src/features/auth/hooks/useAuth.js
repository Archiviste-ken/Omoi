import { login, register, getMe, logout } from "../services/auth.api";

import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogin({ email, password }) {
    try {
      setLoading(true);

      const data = await login({
        email,
        password,
      });

      setUser(data.user);

      return {
        success: true,
      };
    } catch (error) {
      console.log(error.response?.data);

      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  }

  async function handleGetMe() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  }

  async function handlelogout() {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  }

  useEffect(() => {
    handleGetMe();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handlelogout,
    handleGetMe,
  };
};
