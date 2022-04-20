import moment from "moment";
import { useState, useEffect, useContext, createRef } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactTooltip from "react-tooltip";
import { Rating } from "react-simple-star-rating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import movieNotfound from "../assets/movie-notfound.svg";
import castNotfound from "../assets/cast-notfound.svg";

import { addReview } from "../services/review.service";
import { AuthContext } from "../helpers/AuthContext";
import { addToWatchlist, getMovieDetails } from "../services/movie.service";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link, useParams } from "react-router-dom";
import MovieCast from "../components/movieCast.component";

const MovieDetails = () => {
  const { currentUser } = useContext(AuthContext);

  const { width } = useWindowDimensions();
  const { id } = useParams();

  const [movie, setMovie] = useState(undefined);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const reviewInput = createRef();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    theme: "dark",
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  };

  const notifyError = (message) => toast.error(message, toastOptions);
  const notifySuccess = (message) => toast.success(message, toastOptions);

  useEffect(() => {
    setLoading(true);

    getMovieDetails(id)
      .then(async (response) => {
        setMovie(response.data);
        console.log(response.data);
        setReviews(response.data.movie_reviews);
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
      rating: rating / 10,
      username: currentUser.username,
    }).then((response) => {
      setReview("");
      setRating(0);
      setReviews([response.data, ...reviews]);
    });
  };

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
    !loading && (
      <div
        className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movie.backdrop_path}`})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <ToastContainer />
        <div
          className="min-vh-100 container"
          style={{
            backgroundColor: "rgba(24, 24, 24, 0.9)",
            padding: 40,
            paddingTop: 100,
          }}
        >
          <ReactTooltip
            effect="solid"
            place="bottom"
            className="tooltip"
            arrowColor="transparent"
            delayShow={0}
            html={true}
          />
          <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={viewAnim}
            className="movie-card"
          >
            <div className="row justify-content-center">
              <div className={`col${width > 992 && "-3"}`}>
                <div className="poster-img">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    onError={(e) => (
                      (e.target.onerror = null), (e.target.src = movieNotfound)
                    )}
                    alt="poster"
                  />
                </div>
                <div className="hstack actions justify-content-center">
                  <button
                    className="action-btn"
                    data-tip={`${
                      !currentUser ? "Login to a" : "A"
                    }dd to watchlist`}
                    onClick={handleAddToWatchlist}
                  >
                    <i className="bi bi-bookmark-fill"></i>
                  </button>
                  <button
                    className="action-btn"
                    data-tip={`${!currentUser ? "Login to like" : "I like it"}`}
                  >
                    <i className="bi bi-emoji-smile-fill"></i>
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => reviewInput.current.focus()}
                    data-tip={`${!currentUser ? "Login to review" : "Review"}`}
                  >
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
                      if (i < 7)
                        return (
                          <div className="row" key={i}>
                            <button
                              type="button"
                              style={{ all: "unset" }}
                              data-bs-toggle="modal"
                              data-bs-target={`#castModal${i}`}
                            >
                              <div
                                className="avatar-container"
                                data-tip={`<div style='text-align: center;'><span style='font-weight: bold;'>${
                                  cast.name
                                }</span><br/> ${
                                  cast.movie_casts.character !== null ?
                                  `as ${cast.movie_casts.character}` : ""
                                }
                                  </div>`}
                              >
                                <img
                                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                                  onError={(e) => (
                                    (e.target.onerror = null),
                                    (e.target.src = castNotfound)
                                  )}
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
                        <div className="hstack">
                          <label>Leave a review</label>
                          <div style={{ marginBottom: -2, marginLeft: 10 }}>
                            <Rating
                              onClick={handleRating}
                              ratingValue={rating}
                              readonly={!currentUser}
                              fillColor="var(--primary)"
                              emptyColor="var(--primary)"
                              fullIcon={<i className="bi bi-star-fill"></i>}
                              emptyIcon={<i className="bi bi-star"></i>}
                              allowHalfIcon={true}
                              transition={true}
                            />
                          </div>
                        </div>

                        <textarea
                          ref={reviewInput}
                          className="form-control"
                          style={{ maxHeight: 150 }}
                          disabled={loading || !currentUser}
                          placeholder={
                            currentUser
                              ? "Was it great? or was it not to your expectations?"
                              : "Login to leave a review"
                          }
                          value={review}
                          onChange={(e) => {
                            setReview(e.target.value.split("\\n").join("\n"));
                          }}
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
                          disabled={loading || rating === 0 || !currentUser}
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
                    <br />
                    <span
                      style={{
                        color: "var(--light)",
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      Reviews (Last 24h)
                    </span>
                    <hr style={{ margin: "5px 0px" }} />
                    <div className="reviews vstack">
                      <ul>
                        {reviews &&
                          reviews
                            .sort((a, b) =>
                              a.createdAt < b.createdAt ? 1 : -1
                            )
                            .map((review) => {
                              return (
                                <li key={review.id}>
                                  <div className="vstack">
                                    <div className="hstack">
                                      <div
                                        style={{
                                          fontSize: 14,
                                          marginBottom: 0,
                                        }}
                                      >
                                        Review by{" "}
                                        <Link
                                          to={`/${review.userId}`}
                                          className="user-link"
                                          style={{
                                            all: "unset",
                                          }}
                                        >
                                          {review.username}
                                        </Link>
                                      </div>
                                      <div
                                        className="star-rating"
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 500,
                                          marginLeft: 5,
                                        }}
                                      >
                                        <i className="bi bi-star-fill"></i>
                                        <span>{review.rating}/10</span>
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        fontSize: 14,
                                        lineHeight: 1.5,
                                        whiteSpace: "pre-wrap",
                                      }}
                                    >
                                      {review.content}
                                    </div>
                                  </div>
                                  <hr style={{ margin: "5px 0px" }} />
                                </li>
                              );
                            })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  );
};

export default MovieDetails;
