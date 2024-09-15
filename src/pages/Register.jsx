import React, { useState } from "react";
import "../styles/form.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { MdKeyboardArrowLeft } from "react-icons/md";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("api/register/", {
        username,
        email,
        password,
        password2,
      });
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      setError(JSON.stringify(error.response.data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <Link to="/">
        <div className="back-button d-flex align-items-center mb-3">
          <MdKeyboardArrowLeft
            className="me-2 back-icon"
            style={{ cursor: "pointer", color: "rgb(65, 105, 225)" }}
          />
        </div>
      </Link>
      <form onSubmit={handleSubmit} className="form">
        <p className="title">Register </p>
        {error && <p className="error-message">{error}</p>}

        <label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=""
            type="text"
            className="input"
          />
          <span>Username</span>
        </label>

        <label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=""
            type="email"
            className="input"
          />
          <span>Email</span>
        </label>

        <label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=""
            type="password"
            className="input"
          />
          <span>Password</span>
        </label>
        <label>
          <input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            placeholder=""
            type="password"
            className="input"
          />
          <span>Confirm password</span>
        </label>
        <div className="wrapper">
          <button type="submit" disabled={loading} className="submit">
            {loading ? "loading..." : "Register"}
          </button>
        </div>
        <p className="signin">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
