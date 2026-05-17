import "../style/register.scss";
import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { handleRegister } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    await handleRegister({ username, email, password });

    navigate("/");
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormGroup
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;

/**
 *  /login => login form
 * /register => register form
 */
