import { useAuth } from './AuthContext';
import { useState } from 'react';

const AuthToggle = () => {
  const { user, login, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      // Clear form data after successful login
      setFormData({ email: '', password: '' });
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., display error message to user)
    }
  };

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email} // Corrected field name
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default AuthToggle;
