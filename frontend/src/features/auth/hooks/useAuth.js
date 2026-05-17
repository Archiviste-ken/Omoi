import { login, register, getMe, logout } from "../services/auth.api";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } finally {
      setLoading(false);
    }
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

  const handleGetMe = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser]);

  async function handlelogout() {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetMe();
  }, [handleGetMe]);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handlelogout,
    handleGetMe,
  };
};
