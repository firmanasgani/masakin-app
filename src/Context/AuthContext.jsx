import { createContext, useEffect, useState } from "react";
import API from "../API";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userResponse = await API.authenticate();
        const user = userResponse.data;
        setState(user);
      } catch (error) {
        console.log("error :", error);
        setError(error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const loginResponse = await API.login(email, password);

      localStorage.setItem("access_token", loginResponse.access_token);

      const userResponse = await API.authenticate();
      const user = userResponse.data;
      setState(user);
    } catch (error) {
      console.log("error :", error);

      localStorage.removeItem("access_token");
      setError(error);
    }
  };
  return (
    <AuthContext.Provider value={{ user: state, handleLogin, error }}>
      {children}
    </AuthContext.Provider>
  );
};
