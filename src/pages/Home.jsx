import React, { useEffect, useState } from "react";
import "../styles/tasklist.css";
import api from "../api";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { FilterButton } from "../components/FilterButton";
import TList from "../components/TList";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null); // Stores the URL of the next page
  const [prevPage, setPrevPage] = useState(null);
  const [searchvalue, setSearchvalue] = useState("");

  const fetchTasks = async (url = "api/tasks/", search = " ") => {
    try {
      setLoading(true);
      const res = await api.get(url, { params: { search: search } });
      if (res.data && res.data.results) {
        setTasks(res.data.results);
        setNextPage(res.data.next); // Update next page URL
        setPrevPage(res.data.previous);
      } else if (Array.isArray(res.data)) {
        // If non-paginated response, handle it as a regular list
        setTasks(res.data);
        setNextPage(null); // No pagination, so no next page
        setPrevPage(null);
      } else {
        setError("Received invalid data from the server");
      }
    } catch (error) {
      console.error(
        "Error occurred when fetching tasks from the backend",
        error
      );
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = (term) => {
    setSearchvalue(term);
    fetchTasks("api/tasks/", term); // Fetch tasks based on search term
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchTasks(nextPage, searchvalue);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchTasks(prevPage, searchvalue);
    }
  };

  if (loading) return <div>Loading...</div>;
  // if the user did't created anything
  if (tasks.length === 0) {
    return (
      <div className="col-12 text-center mt-5">
        <h5>No tasks available</h5>
        <p>Create your first task to get started!</p>
        <Link to="/addtask" className="btn btn-primary">
          Create Task
        </Link>
      </div>
    );
  }
  return (
    <div className="container task-container">
      <div className="task-list-container">
        <SearchBar onSearch={handleSearch}></SearchBar>
        <FilterButton setTasks={setTasks}></FilterButton>
        <div className="row task-list">
          {tasks.map((task) => (
            <TList key={task.id} task={task} />
          ))}
        </div>
        {/* next and prev Buttons */}
        <div className="d-flex justify-content-center mt-4">
          <ButtonGroup>
            <Button
              variant="outline-primary"
              onClick={handlePrevPage}
              disabled={!prevPage}
            >
              <FaChevronLeft /> Previous
            </Button>
            <Button
              variant="outline-primary"
              onClick={handleNextPage}
              disabled={!nextPage}
            >
              Next <FaChevronRight />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};
