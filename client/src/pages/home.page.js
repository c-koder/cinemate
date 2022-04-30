import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

import HomeMovieList from "../components/homeMovieList.component";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { getPopularMovies } from "../services/movie.service";

const Home = () => {
  const { width } = useWindowDimensions();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    document.title = "Cinemate";
    getPopularMovies()
      .then(async (response) => {
        setMovies(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <ReactTooltip
        effect="solid"
        place="bottom"
        className="tooltip"
        arrowColor="transparent"
        delayShow={0}
        html={true}
      />
      <div className="container">
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
              Personalized, convenient and distinct
              <br />
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
              Well,
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
    </div>
  );
};

export default Home;
