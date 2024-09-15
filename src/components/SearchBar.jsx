import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      onSearch(searchValue);
    }
  };
  return (
    <div className="row">
      <div className="col-12">
        <h2 className="text-center mt-4 mb-3">Task Manager</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Search tasks by title..."
          value={searchValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchBar;
