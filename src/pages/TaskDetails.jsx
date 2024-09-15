import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/taskdetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export const TaskDetails = () => {
  // Destructure task details
  const [taskdetails, setTaskdetails] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const res = await api.get(`api/tasks/${id}/`);
        setTaskdetails(res.data);
        console.log(taskdetails);
      } catch (error) {
        console.log("error during the details fetching", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdetails();
  }, [id]);

  const HandleDelete = async (taskid) => {
    try {
      await api.delete(`api/tasks/${taskid}/`);
      toast.success("Task Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.log("error deleting task", error);
    }
  };
  return (
    <div className="container task-details-container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">{taskdetails.title}</h2>
        </div>
        <div className="card-body">
          {/* Task Status */}
          <h5
            className={`badge ${
              taskdetails.status ? "bg-success" : "bg-warning"
            }`}
          >
            {taskdetails.status ? "Completed" : "Pending"}
          </h5>

          {/* Task Description */}
          <p className="mt-4">
            <strong>Description:</strong>{" "}
            {taskdetails.description || "No description available"}
          </p>

          {/* Task Timestamps */}
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(taskdetails.created_at).toLocaleString()}
          </p>
          {taskdetails.updated_at && (
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(taskdetails.updated_at).toLocaleString()}
            </p>
          )}

          <div className="task-buttons d-flex flex-column flex-md-row gap-2 mt-3">
            <Link to="/" className="btn btn-primary mb-2 mb-md-0">
              Back to Task List
            </Link>

            <Link
              to={`/update/${taskdetails.id}`}
              className="btn btn-warning mb-2 mb-md-0"
            >
              Edit Task
            </Link>

            <button
              className="btn btn-danger mb-2 mb-md-0"
              onClick={() => HandleDelete(taskdetails.id)}
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
