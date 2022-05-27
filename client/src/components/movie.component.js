import moment from "moment";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";

import notfound from "../assets/movie-notfound.svg";
import { toastOptions } from "../common/toast-options";
import { AuthContext } from "../helpers/AuthContext";
import { addToWatchlist } from "../services/movie.service";

const Movie = ({ movie }) => {
  const { currentUser } = useContext(AuthContext);
  const [imageError, setImageError] = useState(false);

  const notifyError = (message) => toast.error(message, toastOptions);
  const notifySuccess = (message) => toast.success(message, toastOptions);

  const handleAddToWatchlist = () => {
    if (currentUser) {
      addToWatchlist({ movieId: movie.id, userId: currentUser.id })
        .then((response) => {
          notifySuccess(response.data.message);
        })
        .catch((err) => {
          console.log(err);
          notifyError(err.response.data.message);
        });
    }
  };

  return (
    <div className="col-md-auto movie-container">
      <ReactTooltip
        effect="solid"
        place="bottom"
        className="tooltip"
        arrowColor="transparent"
        delayShow={0}
        html={true}
      />
      <Link to={`/movie/${movie.id}`} style={{ cursor: "pointer" }}>
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
              (e.target.onerror = null),
              (e.target.src = notfound),
              setImageError(true)
            )}
          />
        </div>
      </Link>
      <div
        className="movie-text"
        style={{ backgroundImage: imageError && "none" }}
      >
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
              : `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}mins`}
          </h3>
        </span>
        <div className="hstack action-stack">
          {movie.homepage && (
            <div className="watch-btn">
              <a href={movie.homepage} target="_blank" style={{ all: "unset" }}>
                <h3>
                  <i className="bi bi-play-fill"></i>VISIT SITE
                </h3>
              </a>
            </div>
          )}
          <div className="hstack ms-auto">
            <button
              className="action-btn"
              onClick={handleAddToWatchlist}
              data-tip={`${!currentUser ? "Login to a" : "A"}dd to watchlist`}
            >
              <i className="bi bi-bookmark-fill"></i>
            </button>
            <button className="action-btn">
              <i className="bi bi-share-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
