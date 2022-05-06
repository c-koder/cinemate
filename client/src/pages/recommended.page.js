import { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import MovieList from "../components/movieList.component";
import { getWatchlist } from "../services/movie.service";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link } from "react-router-dom";
import Quiz from "./quiz.page";

const Recommended = () => {
  const { width } = useWindowDimensions();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWatchlist()
      .then((response) => {
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
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center container">
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={viewAnim}
        className="text-center"
      >
        <h1 style={{ color: "var(--light)", padding: 10, fontSize: 32 }}>
          Recommended Movies
        </h1>
        {movies.length > 0 ? (
          <MovieList movies={movies} perRow={4} />
        ) : (
          <div>
            <h1 style={{ color: "var(--light)", padding: 10, fontSize: 18 }}>
              Didn't find any recommendations.
              <br />
              Perhaps, a quick quiz?
            </h1>
            <button
              type="button"
              className="primary-btn"
              data-bs-toggle="modal"
              data-bs-target="#quizModal"
            >
              Take the Quiz
            </button>
            <Quiz />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Recommended;
