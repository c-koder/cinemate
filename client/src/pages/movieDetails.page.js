import moment from "moment";
import { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactTooltip from "react-tooltip";

import { getMovieDetails } from "../services/movie.service";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { width } = useWindowDimensions();
  const { id } = useParams();

  const [movie, setMovie] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getMovieDetails(id)
      .then(async (response) => {
        console.log(response);
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

  return (
    !loading && (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center container">
        <ReactTooltip
          effect="solid"
          place="bottom"
          className="tooltip"
          arrowColor="transparent"
          delayShow={0}
        />
        <div class="movie-card">
          <img
            className="backdrop-img"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          />
          <div className="hstack">
            <div className="col-md-auto poster-img">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="poster"
              />
            </div>
            <div class="details">
              <span className="title">{movie.title}</span>
              <div class="tagline">{movie.tagline}</div>
              <div class="genres">
                {movie.genres.map((genre) => {
                  return <span class="genre">{genre.name}</span>;
                })}
              </div>
              <span className="hstack">
                <i
                  class="bi bi-hand-thumbs-up-fill"
                  style={{ marginRight: 10, color: "var(--primary)" }}
                ></i>
                {movie.vote_count} votes
              </span>
              <div class="description">
                <p>{movie.overview}</p>
                <div class="hstack avatars">
                  {movie.casts.map((cast, i) => {
                    if (i < 5)
                      return (
                        <div className="avatar-container" data-tip={cast.name}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                            alt="avatar"
                          />
                        </div>
                      );
                  })}
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
