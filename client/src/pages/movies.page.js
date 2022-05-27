import moment from "moment";
import { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";

import MovieFilters from "../components/movieFilters.component";
import MovieList from "../components/movieList.component";
import { getGenres, getMovies } from "../services/movie.service";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useSearchParams } from "react-router-dom";

const Movies = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const pageSizes = [
    { id: 0, name: 8 },
    { id: 1, name: 12 },
    { id: 2, name: 16 },
    { id: 3, name: 20 },
  ];
  const [pageSize, setPageSize] = useState(pageSizes[2]);

  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState({});

  const years = [
    { id: 0, name: "All" },
    { id: 1, name: moment().format("YYYY") },
    { id: 2, name: moment().subtract(1, "years").format("YYYY") },
    { id: 3, name: moment().subtract(2, "years").format("YYYY") },
    { id: 4, name: moment().subtract(3, "years").format("YYYY") },
    { id: 5, name: moment().subtract(4, "years").format("YYYY") },
    {
      id: 6,
      name: `${moment().subtract(10, "years").format("YYYY")} - ${moment()
        .subtract(5, "years")
        .format("YYYY")}`,
    },
    {
      id: 7,
      name: `${moment().subtract(16, "years").format("YYYY")} - ${moment()
        .subtract(11, "years")
        .format("YYYY")}`,
    },
    {
      id: 8,
      name: `${moment().subtract(22, "years").format("YYYY")} - ${moment()
        .subtract(17, "years")
        .format("YYYY")}`,
    },
    {
      id: 9,
      name: `${moment().subtract(28, "years").format("YYYY")} - ${moment()
        .subtract(23, "years")
        .format("YYYY")}`,
    },
    {
      id: 10,
      name: `${moment().subtract(34, "years").format("YYYY")} - ${moment()
        .subtract(29, "years")
        .format("YYYY")}`,
    },
    {
      id: 11,
      name: `${moment().subtract(40, "years").format("YYYY")} - ${moment()
        .subtract(35, "years")
        .format("YYYY")}`,
    },
  ];
  const [year, setYear] = useState(years[0]);

  const orderBys = [
    { id: 0, name: "Latest" },
    { id: 1, name: "Oldest" },
    { id: 2, name: "Popular" },
    { id: 3, name: "Year" },
    { id: 4, name: "Alphabetical" },
    { id: 5, name: "Rating" },
  ];
  const [orderBy, setOrderBy] = useState(orderBys[0]);

  const ratedBys = [
    { id: 0, name: "All" },
    { id: 1, name: "9+" },
    { id: 2, name: "8+" },
    { id: 3, name: "7+" },
    { id: 4, name: "6+" },
    { id: 5, name: "5+" },
    { id: 6, name: "4+" },
    { id: 7, name: "3+" },
    { id: 8, name: "2+" },
    { id: 9, name: "1+" },
  ];
  const [ratedBy, setRatedBy] = useState(ratedBys[0]);

  const [searchTitle, setSearchTitle] = useState("");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let title = "";
    if (searchParams.get("title") !== null) {
      title = searchParams.get("title");
    } else {
      title = "";
    }
    setSearchTitle(title);
    fetchMovies(title);
  }, [searchParams, currentPage, pageSize, genre, year, orderBy, ratedBy]);

  const fetchMovies = (title) => {
    setLoading(true);
    const params = requestParams(
      searchTitle || title,
      currentPage,
      pageSize,
      genre,
      year,
      orderBy,
      ratedBy
    );

    getMovies(params)
      .then(async (response) => {
        setTotalItems(response.data.totalItems);
        setMovies(response.data.movies);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };

  useEffect(() => {
    setLoading(true);
    getGenres()
      .then((response) => {
        let tempGenres = [{ id: 0, name: "All" }];
        response.data.map((item) => {
          tempGenres.push(item);
        });
        setGenres(tempGenres);
        setGenre(tempGenres[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const requestParams = (
    searchTitle,
    page,
    pageSize,
    genre,
    year,
    orderBy,
    ratedBy
  ) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }
    if (genre) {
      params["genre"] = genre.id;
    }
    if (year) {
      params["year"] = year.name;
      params["year_id"] = year.id;
    }
    if (orderBy) {
      params["orderBy"] = orderBy.id;
    }
    if (ratedBy) {
      params["ratedBy"] = ratedBy.name;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize.name;
    }
    return params;
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0 });

  const viewAnim = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5 },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return loading ? (
    <span
      className="spinner-border spinner-border-lg"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        color: "var(--light)",
      }}
    ></span>
  ) : (
    <div className="row justify-content-center">
      {width > 1800 && (
        <MovieFilters
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageSizes={pageSizes}
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          genre={genre}
          setGenre={setGenre}
          genres={genres}
          year={year}
          setYear={setYear}
          years={years}
          orderBy={orderBy}
          orderBys={orderBys}
          setOrderBy={setOrderBy}
          ratedBy={ratedBy}
          ratedBys={ratedBys}
          setRatedBy={setRatedBy}
        />
      )}
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={viewAnim}
        className="col-lg mx-auto text-center"
        style={{ padding: "100px 0px 40px" }}
      >
        <h1 style={{ color: "var(--light)", padding: 10, fontSize: 24 }}>
          Explore Movies
        </h1>
        <div className="form-horizontal hstack align-items-end justify-content-center">
          <div
            className={`form-group hstack ${width > 992 ? "w-25" : "w-50"}`}
            style={{
              background: "var(--secondary)",
              paddingLeft: searchTitle !== "" && 20,
              borderRadius: 5,
            }}
          >
            {searchTitle !== "" && (
              <i
                className="bi bi-x-circle"
                style={{
                  color: "rgba(var(--light-rgb), 0.5)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/explore`);
                  setSearchTitle("");
                }}
              />
            )}
            <input
              type="text"
              className="form-control"
              placeholder="Find a good one mate"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginLeft: 20 }}>
            <button
              className="btn btn-primary primary-btn"
              style={{ width: 40 }}
              onClick={() =>
                searchTitle !== "" && navigate(`/explore?title=${searchTitle}`)
              }
            >
              <i className="bi bi-search" style={{ cursor: "pointer" }}></i>
            </button>
          </div>
        </div>
        <br />
        {(genre.name !== "All" ||
          ratedBy.name !== "All" ||
          year.name !== "All" ||
          orderBy.name !== "Latest") && (
          <span className="filters-tab">
            Filters:{" "}
            {genre.name !== "All" && (
              <span style={{ margin: "0px 4px" }}>
                {genre.name}{" "}
                <i
                  className="bi bi-x-circle"
                  style={{ margin: "0 8px 0px 4px" }}
                  onClick={() => setGenre(genres[0])}
                />
              </span>
            )}
            {ratedBy.name !== "All" && (
              <span style={{ margin: "0px 4px" }}>
                {ratedBy.name}{" "}
                <i
                  className="bi bi-x-circle"
                  style={{ margin: "0 8px 0px 4px" }}
                  onClick={() => setRatedBy(ratedBys[0])}
                />
              </span>
            )}
            {year.name !== "All" && (
              <span style={{ margin: "0px 4px" }}>
                {year.name}{" "}
                <i
                  className="bi bi-x-circle"
                  style={{ margin: "0 8px 0px 4px" }}
                  onClick={() => setYear(years[0])}
                />
              </span>
            )}
            {orderBy.name !== "Latest" && (
              <span style={{ margin: "0px 4px" }}>
                {orderBy.name}{" "}
                <i
                  className="bi bi-x-circle"
                  style={{ margin: "0 8px 0px 4px" }}
                  onClick={() => setOrderBy(orderBys[0])}
                />
              </span>
            )}
            <br />
            <br />
          </span>
        )}

        <Pagination
          activePage={currentPage}
          itemsCountPerPage={pageSize.name}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="‹"
          nextPageText="›"
          onChange={(e) => setCurrentPage(e)}
        />
        <MovieList movies={movies} perRow={4} />
        <br />
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={pageSize.name}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="‹"
          nextPageText="›"
          onChange={(e) => setCurrentPage(e)}
        />
      </motion.div>
    </div>
  );
};

export default Movies;
