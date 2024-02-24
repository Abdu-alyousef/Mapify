import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import classes from "./auth-form.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { handleLogin, session } = useAuth();

  useEffect(()=> {
    const Storedsession = localStorage.getItem('token');
    if(Storedsession){
      
        window.location.href = '/'
    }else{
      setLoading(false)
    }
  }, [session])

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }



  const initialFormState = {
    email: "",
    password: "",
    username: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const result = await handleLogin(formData.email, formData.password);
      if (!result.error) {
        router.replace("/");
      }
    
    } else {
      try {
        const response = await axios.post("/api/register", formData);
        await handleLogin(formData.email, formData.password);
       

      } catch (error) {
        console.log("Authentication failed:", error);
      } finally {
        setLoading(false);
        router.replace("/");
      }
    }
  };

  if (loading) {
    return (
      <div className="spinner">
        <ClipLoader
          color={"#38015c"}
          loading={loading}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
