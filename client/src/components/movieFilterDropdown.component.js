import React from "react";

const MovieSizeDropdown = ({ values, setValue }) => {
  return (
    <ul
      className="dropdown-menu dropdown-menu-end"
      aria-labelledby="movieSizeDropdown"
    >
      {values.map((value) => {
        return (
          <li
            className="dropdown-item"
            key={value.id}
            onClick={() => setValue(value)}
          >
            {value.name}
          </li>
        );
      })}
    </ul>
  );
};

export default MovieSizeDropdown;
