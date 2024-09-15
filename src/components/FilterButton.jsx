import React, { useEffect, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { Link } from "react-router-dom";

export const FilterButton = ({ setTasks }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleFilter = (status) => {
    let url = "api/tasks/";
    if (status == "completed") {
      url += "?status=true";
    } else if (status == "all") {
      url;
    } else {
      url += "?status=false";
    }
    // fetch the filtered data from the backend
    api
      .get(url)
      .then((response) => {
        // Update tasks in parent component
        if (response.data && response.data.results) {
          setTasks(response.data.results);
        } else {
          setTasks([]);
          console.error("Received invalid data from the server", response.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching filtered tasks", error);
      });
  };

  return (
    <div className="row align-items-center mt-3">
      <div className="col-12 col-md-6">
        <div className="filter-btn-group d-flex justify-content-start">
          <button
            className="btn btn-primary me-2"
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className="btn btn-success me-2"
            onClick={() => handleFilter("completed")}
          >
            Completed
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFilter("pending")}
          >
            Pending
          </button>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-1 mb-3 mt-md-0">
        <div className="d-flex justify-content-md-end justify-content-start">
          <Link to="addtask/">
            <button className="btn btn-primary me-2">Add Task</button>
          </Link>

          {isLoggedIn ? (
            <Link to="/logout">
              <button className="btn btn-danger">Logout</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn btn-secondary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
