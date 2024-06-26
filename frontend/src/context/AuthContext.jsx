import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Login, SignUp } from "../api/auth";

import { verifyToken } from "../api/auth";
//contexto
const context = createContext();
//Usar el contexto
export const useAuth = () => {
  const AuthContext = useContext(context);
  if (!AuthContext) {
    throw new Error("UseAuth must be inside a Auth provider");
  }
  return AuthContext;
};
function AuthProvider({ children }) {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Errores, setErrores] = useState(null);
  const [otp, setOtp] = useState(null);
  const [email, setEmail] = useState("");
  const [audit_plan, setAuditPlan] = useState(null);
  const logOut = () => {
    Cookies.remove("token");
    setUser(null);
    setisAuthenticated(false);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setErrores(null);
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, [Errores]);

  const GetIn = async (data) => {
    try {
      const res = await Login(data);

      if (res.status === 200) {
        setisAuthenticated(true);
        setUser(res.data);
        Cookies.set("token", res.data.token);
        setLoading(false);
        return res;
      }
    } catch (error) {
      setLoading(false);
      setErrores(error.response.data);
      setisAuthenticated(false);
    }
  };

  const signup = async (user) => {
    try {
      const res = await SignUp(user);
      if (res) {
        if (res.status === 200) {
          setLoading(false);
          return res;
        }
      }
    } catch (error) {
      setErrores(error.response.data);
      setLoading(false);
    }
    return false;
  };
  //Cambiar contraseña incompleta
  const PasswordChanger = async (newData) => {
    try {
      const res = await changePassword(newData); //Crear funcion cambiar contraseña
      if (res.status == 200) {
        setLoading(false);
        return 200;
      }
    } catch (error) {
      console.log(error);
      setErrores(error.response.data);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setisAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyToken({ token: cookies.token });
        if (!res.data) {
          setisAuthenticated(false);
          setLoading(false);
          return;
        }
        setisAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        logOut();
      }
    };
    checkLogin();
  }, []);

  return (
    <context.Provider
      value={{
        user,
        signup,
        GetIn,
        loading,
        logOut,
        isAuthenticated,
        Errores,
        PasswordChanger,
        email,
        setEmail,
        otp,
        setOtp,
        setErrores,
        setAuditPlan,
        audit_plan,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default AuthProvider;
