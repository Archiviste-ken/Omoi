import React, { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await handleLogin({
      email,
      password,
    });

    if (!response.success) {
      alert(response.message);
      return;
    }

    navigate("/");
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Enter your email"
          />
          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
          />
          <button className="button" type="submit">
            Login
          </button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
