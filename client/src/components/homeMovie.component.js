import { Link } from "react-router-dom";

import notfound from "../assets/movie-notfound.svg";

const HomeMovie = ({ movie }) => {
  return (
    <div className="col-md-auto home-movie-container">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-img">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            onError={(e) => (
              (e.target.onerror = null), (e.target.src = notfound)
            )}
          />
        </div>
      </Link>
    </div>
  );
};

export default HomeMovie;
