import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setCurrentUser(parsedUser.username); // Set the current user's username
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Handle invalid stored user data (e.g., clear localStorage)
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post('/api/login', userData);
      const loggedInUser = response.data;
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setCurrentUser(loggedInUser.username); // Store the username as the current user
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(''); // Clear the current user's username
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
