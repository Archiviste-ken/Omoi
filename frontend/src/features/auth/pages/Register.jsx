import "../style/register.scss";
import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import heroImage from "../../../assets/hero.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { handleRegister, loading } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    await handleRegister({ username, email, password });
    navigate("/");
  }

  return (
    <main className="register-page">
      <section className="auth-hero">
        <span className="auth-hero__eyebrow">Create your account</span>
        <h1>Build your own mood-driven music workspace.</h1>
        <p>
          Register once, then let Moodify handle the premium audio journey with
          a polished interface and expression-based recommendations.
        </p>
        <ul className="auth-hero__list">
          <li>Personalized vibe matching</li>
          <li>Polished glass UI</li>
          <li>Quick, confident onboarding</li>
        </ul>
        <div className="auth-hero__visual">
          <img src={heroImage} alt="Moodify onboarding preview" />
        </div>
      </section>

      <div className="form-container">
        <div className="form-card">
          <span className="form-kicker">Premium onboarding</span>
          <h2>Register</h2>
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
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
        </div>
      </div>
    </main>
  );
};

export default Register;

/**
 *  /login => login form
 * /register => register form
 */
