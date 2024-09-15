import React, { useState } from "react";
import "../styles/form.css";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import { MdKeyboardArrowLeft } from "react-icons/md";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("api/login/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Unauthorized: Incorrect username or password.");
      } else {
        setError("An error occurred. Please try again.", error);
        console.log("An error occurred. Please try again.", error);
      }
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
        <p className="title">Login </p>
        {/* show the error */}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=""
            type="password"
            className="input"
          />
          <span>Password</span>
        </label>
        <div className="wrapper">
          <button disabled={loading} type="submit" className="submit">
            {loading ? "loading..." : "Login"}
          </button>
        </div>
        <p className="signin">
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};
