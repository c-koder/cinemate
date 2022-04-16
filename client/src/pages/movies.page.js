import moment from "moment";
import { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Pagination from "react-responsive-pagination";

import MovieFilters from "../components/movieFilters.component";
import MovieList from "../components/movieList.component";
import {
  addMovie,
  deleteMovie,
  getGenres,
  getMovies,
  updateMovie,
} from "../services/movie.service";
import useWindowDimensions from "../hooks/useWindowDimensions";
import axios from "axios";
import { addCast } from "../services/cast.service";

const Movies = () => {
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const pageSizes = [
    { id: 0, name: 6 },
    { id: 1, name: 9 },
    { id: 2, name: 12 },
    { id: 3, name: 15 },
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

  // useEffect(() => {
  //   let page = 1;
  //   const timer = setInterval(() => {
  //     page <= 200 &&
  //       axios
  //         .get(
  //           `https://api.themoviedb.org/3/movie/popular?api_key=08a4d48a2085c0e4a8d727d79ddf139e&language=en-US&page=${page}`
  //         )
  //         .then((response) => {
  //           response.data.results.map((item) => {
  //             let movie = {
  //               id: item.id,
  //               title: item.title,
  //               release_date:item.release_date,
  //               status: "",
  //               runtime: 0,
  //               original_language: item.original_language,
  //               homepage: "",
  //               budget: 0,
  //               revenue: 0,
  //               imdb_id: "",
  //               overview: item.overview,
  //               poster_path: item.poster_path,
  //               vote_average: item.vote_average,
  //               vote_count: item.vote_count,
  //               popularity: 0,
  //             };
  //             axios
  //               .get(
  //                 `https://api.themoviedb.org/3/movie/${item.id}?api_key=08a4d48a2085c0e4a8d727d79ddf139e`
  //               )
  //               .then((response) => {
  //                 movie.status = response.data.status;
  //                 movie.runtime = response.data.runtime;
  //                 movie.homepage = response.data.homepage;
  //                 movie.tagline = response.data.tagline;
  //                 movie.budget = response.data.budget;
  //                 movie.revenue = response.data.revenue;
  //                 movie.imdb_id = response.data.imdb_id;
  //                 movie.popularity = response.data.popularity;
  //                 if (response.data.belongs_to_collection) {
  //                   movie.belongs_to_collection = {
  //                     id: response.data.belongs_to_collection.id,
  //                     name: response.data.belongs_to_collection.name,
  //                     poster_path:
  //                       response.data.belongs_to_collection.poster_path,
  //                     backdrop_path:
  //                       response.data.belongs_to_collection.backdrop_path,
  //                   };
  //                 }
  //                 movie.genres = response.data.genres;
  //                 console.log(movie);
  //                 addMovie(movie);
  //               });
  //           });
  //           page++;
  //         });
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    let timer = setTimeout(
      () => {
        setLoading(true);
        const params = getRequestParams(searchTitle);
        getMovies(params)
          .then(async (response) => {
            setMovies(response.data.movies);
            setPageCount(response.data.totalPages);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      },
      searchTitle !== "" ? 1000 : 0
    );

    return () => {
      clearTimeout(timer);
    };
  }, [searchTitle]);

  useEffect(() => {
    setLoading(true);
    const params = getRequestParams(
      searchTitle,
      currentPage,
      pageSize,
      genre,
      year,
      orderBy,
      ratedBy
    );

    getMovies(params)
      .then(async (response) => {
        // for (let i = 0; i < response.data.length; i++) {
        //   const movie = response.data[i];
        //   await axios
        //     .get(
        //       `https:api.themoviedb.org/3/movie/${movie.id}?api_key=08a4d48a2085c0e4a8d727d79ddf139e`
        //     )
        //     .then(async (response) => {
        // for (let j = 0; j < response.data.cast.length; j++) {
        //   const item = response.data.cast[j];
        //   await addCast({
        //     movie_id: id,
        //     id: item.cast_id,
        //     character: item.character,
        //     name: item.name,
        //     order: item.order,
        //     popularity: item.popularity,
        //     profile_path: item.profile_path,
        //   }).then((addResponse) => console.log(addResponse.data.message));
        // }

        // for (let j = 0; j < response.data.length; j++) {
        //   const item = response.data[j];
        //   await updateMovie({
        //     id: movie.id,
        //     release_date: item.release_date,
        //     backdrop_path: item.backdrop_path,
        //     status: item.status,
        //     homepage: item.homepage,
        //     budget: item.budget,
        //     revenue: item.revenue,
        //     vote_average: item.vote_average,
        //     vote_count: item.vote_count,
        //     popularity: item.popularity,
        //   }).then((updateResponse) =>
        //     console.log(updateResponse.data.message)
        //   );
        // }
        // });
        // }
        console.log(response);
        setMovies(response.data.movies);
        setPageCount(response.data.totalPages);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentPage, pageSize, genre, year, orderBy, ratedBy]);

  useEffect(() => {
    getGenres().then((response) => {
      let tempGenres = [{ id: 0, name: "All" }];
      response.data.map((item) => {
        tempGenres.push(item);
      });
      setGenres(tempGenres);
      setGenre(tempGenres[0]);
    });
  }, []);

  const getRequestParams = (
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

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center container">
      {width > 992 && (
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

      {loading ? (
        <span
          className="centered spinner-border spinner-border-lg mx-2"
          style={{ color: "var(--light)" }}
        ></span>
      ) : (
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={viewAnim}
          className="text-center"
          style={{ marginTop: width > 992 && "375px" }}
        >
          <h1 style={{ color: "var(--light)", padding: 10, fontSize: 24 }}>
            Explore Movies
          </h1>
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
            current={currentPage}
            total={pageCount}
            onPageChange={(e) => setCurrentPage(e)}
            maxWidth={width > 992 ? 600 : width > 400 ? 400 : 300}
          />
          <MovieList movies={movies} />
          <br />
          <Pagination
            current={currentPage}
            total={pageCount}
            onPageChange={(e) => setCurrentPage(e)}
            maxWidth={width > 992 ? 600 : width > 400 ? 400 : 300}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Movies;
