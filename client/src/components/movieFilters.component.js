import { useNavigate } from "react-router-dom";
import MovieSizeDropdown from "./movieFilterDropdown.component";

const MovieFilters = (props) => {
  const navigate = useNavigate();

  return (
    <div className="filter-container">
      <div className="row">
        <div
          className="form-horizontal hstack align-items-end"
          style={{ padding: "0px 20px" }}
        >
          <div className="form-group w-100">
            <label>Seach</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Find a good one matey..."
              value={props.searchTitle}
              onChange={(e) => props.setSearchTitle(e.target.value)}
            />
          </div>
          {props.searchTitle !== "" && (
            <div className="form-group" style={{ marginLeft: 20 }}>
              <button
                className="btn btn-primary primary-btn"
                style={{ width: 40 }}
                onClick={() => {
                  navigate(`/explore`);
                  props.setSearchTitle("");
                }}
              >
                <i class="bi bi-x-circle" style={{ marginRight: 0 }}></i>
              </button>
            </div>
          )}
          <div className="form-group" style={{ marginLeft: 20 }}>
            <button
              className="btn btn-primary primary-btn"
              style={{ width: 40 }}
              onClick={() => {
                navigate(`/explore?title=${props.searchTitle}`);
              }}
            >
              <i class="bi bi-search" style={{ marginRight: 0 }}></i>
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex">
          <div className="dropdown filter-dropdown">
            <span>Genre</span>
            <button
              className="primary-btn filter-btn hstack"
              id="movieSizeDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {props.genre.name}
              <i className="bi bi-filter-right ms-auto"></i>
            </button>
            <MovieSizeDropdown
              values={props.genres}
              setValue={props.setGenre}
            />
          </div>
          <div className="dropdown filter-dropdown">
            <span>Rating</span>
            <button
              className="primary-btn filter-btn hstack"
              id="movieSizeDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {props.ratedBy.name}
              <i className="bi bi-filter-right ms-auto"></i>
            </button>
            <MovieSizeDropdown
              values={props.ratedBys}
              setValue={props.setRatedBy}
            />
          </div>
          <div className="dropdown filter-dropdown">
            <span>Year</span>
            <button
              className="primary-btn filter-btn hstack"
              id="movieSizeDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {props.year.name}
              <i className="bi bi-filter-right ms-auto"></i>
            </button>
            <MovieSizeDropdown values={props.years} setValue={props.setYear} />
          </div>
          <div className="dropdown filter-dropdown">
            <span>Order By</span>
            <button
              className="primary-btn filter-btn hstack"
              id="movieSizeDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {props.orderBy.name}
              <i className="bi bi-filter-right ms-auto"></i>
            </button>
            <MovieSizeDropdown
              values={props.orderBys}
              setValue={props.setOrderBy}
            />
          </div>
          <div className="dropdown filter-dropdown">
            <span>Items to show</span>
            <button
              className="primary-btn filter-btn hstack"
              id="movieSizeDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {props.pageSize.name}
              <i className="bi bi-filter-right ms-auto"></i>
            </button>
            <MovieSizeDropdown
              values={props.pageSizes}
              setValue={props.setPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieFilters;
