import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../styles/tasklist.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get(`api/tasks/${id}/`);
        const taskdetails = res.data;
        setTitle(taskdetails.title);
        setDescription(taskdetails.description);
        setStatus(taskdetails.status);
      } catch (error) {
        console.log("error during fetching the task details", error);
        setError(error);
      }
    };
    fetchdata();
  }, [id]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);

    try {
      await api.put(`api/tasks/${id}/`, formData);
      navigate(`/tasks/${id}`);
    } catch (error) {
      console.log("error during the updating", error);
      setError("error during updating task", error);
    } finally {
      setLoading(false);
    }
  };
  const BackButton = () => {
    navigate(`/tasks/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="row task-form">
        <div className="col-12">
          <h4>Create a New Task</h4>
          <form onSubmit={handleUpdateTask}>
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
                {loading ? "Loading" : "Update Task"}
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
