import { useState, useEffect } from "react";
import Pagination from "react-responsive-pagination";

import MovieList from "../components/movie-list.component";
import { getMovies } from "../services/movie.service";

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const pageSizes = [6, 9, 12];
  const [searchTitle, setSearchTitle] = useState("");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = getRequestParams(searchTitle, currentPage, pageSize);
    getMovies(params)
      .then((response) => {
        setMovies(response.data.movies);
        setPageCount(response.data.totalPages);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentPage, pageSize, searchTitle]);

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center container text-center">
      <h1>Movies</h1>
      {"Items per Page: "}
      <select onChange={(e) => setPageSize(e.target.value)} value={pageSize}>
        {pageSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <Pagination
        current={currentPage}
        total={pageCount}
        onPageChange={(e) => setCurrentPage(e)}
        maxWidth={600}
      />
      {!loading && <MovieList movies={movies} />}
      <Pagination
        current={currentPage}
        total={pageCount}
        onPageChange={(e) => setCurrentPage(e)}
        maxWidth={600}
      />
    </div>
  );
};

export default Movies;
