import { createContext, useEffect, useState } from "react";
import axios from "axios";
import ActionProvider from "./ActionContext";
import { showSuccessToast, showErrorToast } from "../../lib/Toast";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  async function handleLogin(values) {
    try {
      const { data } = await axios.post("/users/employee/login", values);
      if (data.success) {
        setIsAuth(true);
        setUser(data.data);
        showSuccessToast(data.message);
        return true;
      }
    } catch (error) {
      showErrorToast(error.response.data.error);
      return false;
    }
  }

  async function authUser() {
    try {
      const { data } = await axios.get("/users/auth");
      if (data.success) {
        setIsAuth(true);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    authUser();
  }, []);

  async function handleLogout() {
    try {
      const { data } = await axios.get("/users/logout");
      setIsAuth(false);
      showSuccessToast(data.message);
    } catch (error) {
      showErrorToast(error.response.data.error);
    }
  }

  const value = {
    handleLogin,
    user,
    isAuth,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      <ActionProvider>{children}</ActionProvider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
