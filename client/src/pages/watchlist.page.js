import { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import MovieList from "../components/movieList.component";
import {  getWatchlist } from "../services/movie.service";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { width } = useWindowDimensions();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWatchlist()
      .then(async (response) => {
        setMovies(response.data[0].user_watchlist);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
        >
          <h1 style={{ color: "var(--light)", padding: 10, fontSize: 32 }}>
            Watchlist
          </h1>
          {movies.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <div>
              <h1 style={{ color: "var(--light)", padding: 10, fontSize: 18 }}>
                Your watchlist is empty.
              </h1>
              <Link to="/explore">
                <button className="primary-btn">Explore Movies</button>
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Watchlist;
