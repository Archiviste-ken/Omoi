import React, { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import heroImage from "../../../assets/hero.png";

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
      <section className="auth-hero">
        <span className="auth-hero__eyebrow">Moodify access</span>
        <h1>Welcome back to your private listening studio.</h1>
        <p>
          Sign in to continue the premium, mood-aware music flow built around
          your expression.
        </p>
        <ul className="auth-hero__list">
          <li>Face-led music matching</li>
          <li>Elegant playback controls</li>
          <li>Fast session handoff</li>
        </ul>
        <div className="auth-hero__visual">
          <img src={heroImage} alt="Moodify listening preview" />
        </div>
      </section>

      <div className="form-container">
        <div className="form-card">
          <span className="form-kicker">Secure sign-in</span>
          <h2>Login</h2>
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
            type="password"
            placeholder="Enter your password"
          />
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
