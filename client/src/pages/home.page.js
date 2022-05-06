import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import axios from "axios";

import bookmarkImg from "../assets/bookmarks.png";

import HomeMovieList from "../components/homeMovieList.component";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { addMovie, getPopularMovies } from "../services/movie.service";
import { addCast } from "../services/cast.service";

const Home = () => {
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    document.title = "Cinemate";
    getPopularMovies()
      .then(async (response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={viewAnim}
    >
      <ReactTooltip
        effect="solid"
        place="bottom"
        className="tooltip"
        arrowColor="transparent"
        delayShow={0}
        html={true}
      />
      <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="row justify-content-center">
          <div
            className={`col my-auto ${
              width > 992 ? "order-1" : "order-2 text-center mt-3"
            }`}
          >
            <h1
              style={{
                fontSize: width > 992 ? 72 : 36,
                color: "var(--light)",
                fontWeight: 600,
                letterSpacing: 2,
              }}
            >
              Cine<span style={{ color: "var(--primary)" }}>mate</span>
            </h1>
            <span
              style={{ fontSize: width > 992 ? 20 : 18, color: "var(--light)" }}
            >
              Personalized and convenient{" "}
              <span
                style={{
                  fontWeight: 500,
                }}
              >
                Movie Recommendations
              </span>
            </span>
            <br />
            <br />
            <span style={{ fontSize: 18, color: "var(--light)" }}>
              <u data-tip="Of course you are!">Curious</u> as to how it works?
            </span>
            <br />
            <br />
            <button className="primary-btn" style={{ fontWeight: 700 }}>
              <span
                style={{
                  color: "var(--primary-light)",
                  cursor: "pointer",
                }}
              >
                FIND OUT MORE!
              </span>
            </button>
          </div>
          <div className={`col-md-auto ${width > 992 ? "order-2" : "order-1"}`}>
            <div
              style={{
                transform: `skewX(${width > 992 ? "-10deg" : "-5deg"})`,
                boxShadow:
                  width > 992 && "0px 0px 50px 10px rgba(0, 0, 0, 0.25)",
              }}
            >
              <HomeMovieList movies={movies} perRow={4} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="row justify-content-center">
          <div className="col-md-auto">
            <img src={bookmarkImg} style={{ width: "100%" }} />
          </div>
          <div className={`col my-auto ${width < 992 && "text-center mt-3"}`}>
            <h1
              style={{
                fontSize: width > 992 ? 72 : 36,
                color: "var(--light)",
                fontWeight: 600,
                letterSpacing: 2,
              }}
            >
              <span style={{ color: "var(--primary)" }}>Watch</span>list
            </h1>
            <span
              style={{ fontSize: width > 992 ? 20 : 18, color: "var(--light)" }}
            >
              Add a movie to your watchlist,
              <br /> So you could look more into it later.
            </span>
            <br />
            <br />
            <Link to="/watchlist">
              <button className="primary-btn" style={{ fontWeight: 700 }}>
                <span
                  style={{
                    color: "var(--primary-light)",
                    cursor: "pointer",
                  }}
                >
                  YOUR WATCHLIST
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
