import { useContext, useState } from "react";
import ReactTooltip from "react-tooltip";
import SurveyItem from "../components/surveyItem.component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

import { toastOptions } from "../common/toast-options";
import { getRecommendedMovies } from "../services/movie.service";
import { addRecommendation } from "../services/recommendation.service";
import { AuthContext } from "../helpers/AuthContext";

const Survey = ({
  setMovies,
  currentPage,
  setTotalItems,
  qna,
  answer1,
  answer2,
  answer3,
}) => {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const notifyError = (message) => toast.error(message, toastOptions);
  const notifySuccess = (message) => toast.success(message, toastOptions);

  const handleSave = () => {
    if (
      answer1 === undefined ||
      answer2 === undefined ||
      answer3 === undefined
    ) {
      notifyError("Please provide answers for all queries.");
    } else {
      const reducedAnswer1 = answer1.reduce(
        (prev, curr) => `${prev}${curr},`,
        ""
      );
      addRecommendation({
        q1: reducedAnswer1,
        q2: answer2,
        q3: answer3,
        userId: currentUser.id,
      })
        .then(() => {
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = () => {
    if (
      answer1 === undefined ||
      answer2 === undefined ||
      answer3 === undefined
    ) {
      notifyError("Please provide answers for all queries.");
    } else {
      findRecommendedMovies();
    }
  };

  const findRecommendedMovies = () => {
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
      document.getElementById("closeSurveyModal").click();
      
      setMovies(response.data.movies);
      setTotalItems(response.data.totalItems);
      setLoading(false);

      window.localStorage.removeItem("rec");
      window.localStorage.setItem(
        "rec",
        JSON.stringify({
          [qna[0].id]: answer1,
          [qna[1].id]: answer2,
          [qna[2].id]: answer3,
          exp: moment().add(2, "hours").format("DD/MM/YYYY HH:mm"),
        })
      );
    });
  };

  return (
    <div
      className="modal fade"
      id="surveyModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="surveyModalTitle"
      aria-hidden="true"
    >
      <ReactTooltip
        effect="solid"
        place="bottom"
        className="tooltip"
        arrowColor="transparent"
        delayShow={0}
        html={true}
      />
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div
          className="modal-content"
          style={{
            background: "var(--secondary)",
            color: "var(--light)",
            padding: 20,
          }}
        >
          <div className="modal-header" style={{ border: "none" }}>
            <h5 className="modal-title" id="surveyModalTitle">
              Recommendations Survey
            </h5>
            <button
              type="button"
              className="primary-btn"
              id="closeSurveyModal"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i
                className="bi bi-x"
                style={{ fontSize: 20, cursor: "pointer" }}
              ></i>
            </button>
          </div>
          <div
            className="modal-body survey-container"
            style={{
              height: 400,
              overflowY: "scroll",
              background: "rgba(var(--light-rgb), 0.025)",
              borderRadius: 5,
              margin: "10px 15px",
            }}
          >
            {qna.map((item, index) => {
              return (
                <SurveyItem
                  key={item.id}
                  qNum={index}
                  id={item.id}
                  question={item.name}
                  multiple={item.multiple}
                  ans={index === 0 ? answer1 : index === 1 ? answer2 : answer3}
                  values={item.answers}
                  setValues={item.set_values}
                />
              );
            })}
          </div>
          <div className="modal-footer" style={{ border: "none" }}>
            <button
              type="button"
              className="primary-btn"
              onClick={currentUser ? handleSave : handleSubmit}
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm mx-2"
                  style={{ color: "var(--dark)" }}
                ></span>
              )}
              {currentUser ? "Save" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
