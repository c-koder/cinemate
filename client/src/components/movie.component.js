import moment from "moment";
import { Link } from "react-router-dom";

import notfound from "../assets/notfound.png";

const Movie = ({ movie }) => {
  return (
    <div className="col-md-auto movie-container">
      <Link to={`/movie/${movie.id}`}>
        <div className="menu">
          <i className="bi bi-three-dots-vertical"></i>
        </div>
        <div className="ratings">
          <i className="bi bi-star-fill"></i>
          <span>{movie.vote_average}</span>
        </div>
        <div className="movie-img">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            onError={(e) => (
              (e.target.onerror = null), (e.target.src = notfound)
            )}
          />
        </div>
        <div className="movie-text">
          <h1>{movie.title}</h1>
          <span className="hstack">
            <h3>
              {movie.release_date === null
                ? movie.status
                : moment(movie.release_date, "YYYY-MM-DD").format("YYYY")}
            </h3>
            <h3 className="ms-auto">
              {movie.runtime === 0
                ? ""
                : `${Math.floor(movie.runtime / 60)}h ${
                    movie.runtime % 60
                  }mins`}
            </h3>
          </span>
          <div className="hstack action-stack">
            {movie.homepage && (
              <div className="watch-btn">
                <a
                  href={movie.homepage}
                  target="_blank"
                  style={{ all: "unset" }}
                >
                  <h3>
                    <i className="bi bi-play-fill"></i>VISIT SITE
                  </h3>
                </a>
              </div>
            )}
            <div className="hstack ms-auto">
              <div className="action-btn">
                <i className="bi bi-bookmark-fill"></i>
              </div>
              <div className="action-btn">
                <i className="bi bi-share-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
