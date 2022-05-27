import { useState, useEffect, useContext } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Pagination from "react-js-pagination";
import ReactTooltip from "react-tooltip";

import MovieList from "../components/movieList.component";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Survey from "./survey.page";
import { getRecommendedMovies } from "../services/movie.service";
import { AuthContext } from "../helpers/AuthContext";
import moment from "moment";
import { getRecommendation } from "../services/recommendation.service";

const Recommended = () => {
  const { currentUser } = useContext(AuthContext);
  const { width } = useWindowDimensions();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [movies, setMovies] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const [dataFound, setDataFound] = useState(false);

  const [answer1, setAnswer1] = useState([undefined]);
  const [answer2, setAnswer2] = useState(undefined);
  const [answer3, setAnswer3] = useState(undefined);

  const qna = [
    {
      id: 0,
      name: "Which out of these movie genres would you say you prefer the most?",
      answers: [
        { id: 0, name: "Action" },
        {
          id: 1,
          name: "Fantasy",
        },
        { id: 2, name: "Comedy" },
        { id: 3, name: "Horror" },
        { id: 4, name: "Romance" },
      ],
      multiple: true,
      set_values: setAnswer1,
    },
    {
      id: 1,
      name: "Would you rather a long or a short movie?",
      answers: [
        { id: 0, name: "Short ones." },
        { id: 1, name: "Not too short." },
        { id: 2, name: "Don't really mind." },
        { id: 3, name: "Not too long." },
        { id: 4, name: "Long ones." },
      ],
      multiple: false,
      set_values: setAnswer2,
    },
    {
      id: 2,
      name: "Do you have a knack for older movies? Or just the most newest ones?",
      answers: [
        { id: 0, name: "Old is gold!" },
        {
          id: 1,
          name: "Older movies are somewhat better than the ones we see now.",
        },
        { id: 2, name: "Don't really mind." },
        {
          id: 3,
          name: "Newest movies are somewhat better than the older ones.",
        },
        { id: 4, name: "Newest movies are far better!" },
      ],
      multiple: false,
      set_values: setAnswer3,
    },
  ];

  useEffect(() => {
    if (
      answer1 !== undefined &&
      answer2 !== undefined &&
      answer3 !== undefined
    ) {
      setLoading(true);
      let genres = answer1.map((answer) => {
        return qna[0].answers[answer].name;
      });
      getRecommendedMovies({
        genres: genres,
        duration: answer2,
        era: answer3,
        page: currentPage,
      }).then((response) => {
        setMovies(response.data.movies);
        setTotalItems(response.data.totalItems);
        setLoading(false);
      });
    }
  }, [dataFound, currentPage]);

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
    const savedSurveyAnswers = JSON.parse(window.localStorage.getItem("rec"));
    if (savedSurveyAnswers) {
      if (
        moment(savedSurveyAnswers.exp, "DD/MM/YYYY HH:mm").isBefore(moment())
      ) {
        window.localStorage.removeItem("rec");
      } else {
        setAnswer1(savedSurveyAnswers[0]);
        setAnswer2(savedSurveyAnswers[1]);
        setAnswer3(savedSurveyAnswers[2]);
        setDataFound(true);
      }
    }
    if (currentUser) {
      getRecommendation(currentUser.id)
        .then((response) => {
          window.localStorage.removeItem("rec");
          setAnswer1(
            response.data.q1
              .split(",")
              .filter((x) => x.trim().length && !isNaN(x))
              .map(Number)
          );
          setAnswer2(response.data.q2);
          setAnswer3(response.data.q3);
          setDataFound(true);
        })
        .catch((err) => {});
    }
  }, [currentUser]);

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
        className="text-center"
      >
        {movies ? (
          <div style={{ padding: "80px 0px 0px" }}>
            <h1 style={{ color: "var(--light)", padding: 10, fontSize: 32 }}>
              Recommended Movies
            </h1>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={16}
              totalItemsCount={totalItems}
              pageRangeDisplayed={5}
              itemClass="page-item"
              linkClass="page-link"
              prevPageText="‹"
              nextPageText="›"
              onChange={(e) => setCurrentPage(e)}
            />
            <MovieList movies={movies} perRow={4} />
            <br />
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={16}
              totalItemsCount={totalItems}
              pageRangeDisplayed={5}
              itemClass="page-item"
              linkClass="page-link"
              prevPageText="‹"
              nextPageText="›"
              onChange={(e) => setCurrentPage(e)}
            />
            <h1 style={{ color: "var(--light)", padding: 10, fontSize: 18 }}>
              Are the suggested movies to your liking?
              <br />
              Then you oughta save them!
            </h1>
            <div
              data-tip={
                !currentUser
                  ? "You must be logged-in or the temporary save will be erased automatically."
                  : ""
              }
            >
              <button
                type="button"
                className="primary-btn"
                data-bs-toggle="modal"
                data-bs-target="#surveyModal"
                disabled={!currentUser}
              >
                Save/Update
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 style={{ color: "var(--light)", padding: 10, fontSize: 32 }}>
              Recommended Movies
            </h1>
            <h1 style={{ color: "var(--light)", padding: 10, fontSize: 18 }}>
              Didn't find any recommendations.
              <br />
              Perhaps, a quick survey?
            </h1>
            <button
              type="button"
              className="primary-btn"
              data-bs-toggle="modal"
              data-bs-target="#surveyModal"
            >
              Take the Survey
            </button>
          </div>
        )}
        <br />
        <Survey
          qna={qna}
          answer1={answer1}
          answer2={answer2}
          answer3={answer3}
          currentPage={currentPage}
          setTotalItems={setTotalItems}
          setMovies={setMovies}
        />
      </motion.div>
    </div>
  );
};

export default Recommended;
