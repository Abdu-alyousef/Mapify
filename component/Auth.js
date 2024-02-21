import { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make API call to authenticate user
      const response = await axios.post('/api/login', { email, password });
      console.log(response.data); // Handle successful login
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error); // Handle login error
    }
  };

  const handleLogout = async () => {
    try {
      // Make API call to logout user
      await axios.post('/api/logout');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error); // Handle logout error
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Make API call to register new user
      const response = await axios.post('/api/register', { email, password, username });
      console.log(response.data); // Handle successful registration
    } catch (error) {
      console.error('Registration error:', error); // Handle registration error
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {isLoginMode ? (
            <div>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
              </form>
              <p>Don't have an account? <button onClick={toggleMode}>Register</button></p>
            </div>
          ) : (
            <div>
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
              </form>
              <p>Already have an account? <button onClick={toggleMode}>Login</button></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Auth;
