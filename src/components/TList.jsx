import React from "react";
import { Link } from "react-router-dom";

function TList({ task }) {
  return (
    <div className="col-12">
      <div className={`task-item ${task.status ? "completed" : "pending"}`}>
        <Link to={`tasks/${task.id}`} style={{ textDecoration: "none" }}>
          <h5 style={{ color: "black" }}>{task.title}</h5>
        </Link>
        <p>{task.description}</p>
        <small>Status: {task.status ? "Completed" : "Pending"}</small>
      </div>
    </div>
  );
}

export default TList;
