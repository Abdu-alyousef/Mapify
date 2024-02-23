import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    if (token && userId && username) {
      setUserId(userId);
      setUsername(username);
      setSession(token);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      const { token, userId, username } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);

      setUserId(userId);
      setUsername(username);
      setSession(token);
      return { userId, username, token };
    } catch (error) {
      return { error: error.response.data.message };
    }
  };

  const logout = () => {
    setUserId(null);
    setUsername(null);
    setSession(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    router.push("/auth");
  };

  const isAuthenticated = () => {
    return !!userId;
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
        session,
        handleLogin,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
