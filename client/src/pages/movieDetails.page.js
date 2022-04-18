import moment from "moment";
import { useState, useEffect, useContext } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactTooltip from "react-tooltip";

import { addReview } from "../services/review.service";
import { AuthContext } from "../helpers/AuthContext";
import { getMovieDetails } from "../services/movie.service";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useParams } from "react-router-dom";
import MovieCast from "../components/movieCast.component";

const MovieDetails = () => {
  const { currentUser } = useContext(AuthContext);

  const { width } = useWindowDimensions();
  const { id } = useParams();

  const [movie, setMovie] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const [review, setReview] = useState("");

  useEffect(() => {
    setLoading(true);

    getMovieDetails(id)
      .then(async (response) => {
        console.log(response.data);
        setMovie(response.data);
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

  useEffect(() => {
    if (movie)
      document.title =
        movie.title +
        ` (${moment(movie.release_date, "YYYY-MM-DD").format(
          "YYYY"
        )}) - Cinemate`;
  });

  const handleAddReview = () => {
    addReview({
      content: review,
      movieId: movie.id,
      userId: currentUser.id,
      username: currentUser.username,
    }).then((response) => {
      console.log(response.data.message);
    });
  };

  return (
    !loading && (
      <div
        className="min-vh-100 d-flex flex-column justify-content-center align-items-center movie-details-container"
        style={{
          position: "relative",
          backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movie.backdrop_path}`})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div
          className="container"
          style={{
            backgroundColor: "rgba(24, 24, 24, 0.9)",
            padding: 40,
            borderRadius: 10,
          }}
        >
          <ReactTooltip
            effect="solid"
            place="bottom"
            className="tooltip"
            arrowColor="transparent"
            delayShow={0}
          />
          <div className="movie-card">
            <div className="row justify-content-center">
              <div className={`col${width > 992 && "-3"}`}>
                <div className="poster-img">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="poster"
                  />
                </div>
                <div className="hstack actions justify-content-center">
                  <button className="action-btn" data-tip={"Add to watchlist"}>
                    <i className="bi bi-bookmark-fill"></i>
                  </button>
                  <button className="action-btn" data-tip={"I like it"}>
                    <i className="bi bi-emoji-smile-fill"></i>
                  </button>
                  <button className="action-btn" data-tip={"Review"}>
                    <i className="bi bi-chat-fill"></i>
                  </button>
                  <button className="action-btn" data-tip={"Share"}>
                    <i className="bi bi-share-fill"></i>
                  </button>
                </div>
              </div>
              <div className="col details">
                <span className="title">{movie.title}</span>
                <span style={{ fontSize: 32 }}>
                  {` (${moment(movie.release_date, "YYYY-MM-DD").format(
                    "YYYY"
                  )})`}
                </span>
                <div className="tagline">{movie.tagline}</div>
                <div className="genres">
                  {movie.genres.map((genre) => {
                    return (
                      <span key={genre.id} className="genre">
                        {genre.name}
                      </span>
                    );
                  })}
                </div>
                <span className="hstack">
                  <span>
                    <i
                      className="bi bi-emoji-smile-fill"
                      style={{ marginRight: 10, color: "var(--primary)" }}
                    ></i>
                    {movie.vote_count} votes
                  </span>
                  <div className="star-rating">
                    <span>{movie.vote_average} </span>
                    {[...Array(5).keys()].map((key, i) =>
                      (i + 1) * 2 <= movie.vote_average ? (
                        <i key={key} className="bi bi-star-fill"></i>
                      ) : (i + 1) * 2 - movie.vote_average < 2 ? (
                        <i key={key} className="bi bi-star-half"></i>
                      ) : (
                        <i key={key} className="bi bi-star"></i>
                      )
                    )}
                  </div>
                </span>

                <div className="description">
                  <p>{movie.overview}</p>
                  <div className="hstack justify-content-start avatars">
                    {movie.casts.map((cast, i) => {
                      if (i < 5)
                        return (
                          <div key={i}>
                            <button
                              type="button"
                              style={{ all: "unset" }}
                              data-bs-toggle="modal"
                              data-bs-target={`#castModal${i}`}
                            >
                              <div
                                className="avatar-container"
                                data-tip={cast.name}
                              >
                                <img
                                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                                  alt="avatar"
                                />
                              </div>
                            </button>
                            <MovieCast target={`castModal${i}`} cast={cast} />
                          </div>
                        );
                    })}
                  </div>
                  <hr />
                  <div className="review-container">
                    <div
                      className={`${
                        width > 992 ? "hstack" : "row"
                      } align-items-end`}
                    >
                      <div className="form-group w-100">
                        <label>Leave a review</label>
                        <textarea
                          className="form-control"
                          style={{ maxHeight: 100 }}
                          disabled={loading || !currentUser}
                          placeholder={
                            currentUser
                              ? "Was it great? or was it not to your expectations?"
                              : "Login to leave a review"
                          }
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{
                          paddingLeft: width > 992 && 20,
                          paddingTop: width < 992 && 20,
                        }}
                      >
                        <button
                          className="btn btn-primary primary-btn"
                          disabled={loading || review === "" || !currentUser}
                          onClick={handleAddReview}
                        >
                          {loading && (
                            <span
                              className="spinner-border spinner-border-sm mx-2"
                              style={{ color: "var(--light)" }}
                            ></span>
                          )}
                          Review
                        </button>
                      </div>
                    </div>
                    <div className="reviews vstack my-4">
                      <label>Comments (Last 24h)</label>
                      <hr />
                      <ul>
                        {movie.movie_reviews &&
                          movie.movie_reviews.map((review) => {
                            return (
                              <li key={review.id}>
                                <div className="hstack align-items-start">
                                  <div className="user-avatar">
                                    <img
                                      src={review.user_review.profile_path}
                                    />
                                  </div>
                                  <div className="vstack">
                                    <div>{review.user_review.username}</div>
                                    <div>{review.content}</div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MovieDetails;
