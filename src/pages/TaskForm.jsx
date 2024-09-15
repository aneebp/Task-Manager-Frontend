import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/tasklist.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Convert status string to boolean
    const booleanStatus = status === "true" ? true : false;
    try {
      const res = await api.post("api/tasks/", {
        title,
        description,
        status: booleanStatus,
      });
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setError(JSON.stringify(error.response.data));
    } finally {
      setLoading(false);
    }
  };
  const BackButton = () => {
    navigate("/");
  };
  return (
    <div className="container mt-5">
      <div className="row task-form">
        <div className="col-12">
         

          <h4>Create a New Task</h4>
          <form onSubmit={handleCreateTask}>
            {error && <p className="error-message">{error}</p>}
            <div className="mb-3">
              <label htmlFor="taskTitle" className="form-label">
                Task Title
              </label>
              <input
                type="text"
                className="form-control"
                id="taskTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="taskDescription" className="form-label">
                Task Description
              </label>
              <textarea
                className="form-control"
                id="taskDescription"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="taskStatus" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="taskStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="false">Pending</option>
                <option value="true">Completed</option>
              </select>
            </div>
            <div className="d-flex flex-column flex-md-row gap-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100"
              >
                {loading ? "Loading" : "Create Task"}
              </button>

              <button
                type="button"
                onClick={BackButton}
                className="btn btn-secondary w-100"
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
