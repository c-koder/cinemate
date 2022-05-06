import { useState } from "react";
import ReactTooltip from "react-tooltip";
import QuizItem from "../components/quizItem.component";

const Quiz = () => {
  const [answer1, setAnswer1] = useState(undefined);
  const [answer2, setAnswer2] = useState(undefined);
  const [answer3, setAnswer3] = useState(undefined);
  const [answer4, setAnswer4] = useState(undefined);
  const [answer5, setAnswer5] = useState(undefined);

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
      name: "Are animated movies just for kids?",
      answers: [
        { id: 0, name: "Strongly disagree" },
        { id: 1, name: "Disagree" },
        { id: 2, name: "Neither agree or disagree" },
        { id: 3, name: "Agree" },
        { id: 4, name: "Strongly agree" },
      ],
      multiple: false,
      set_values: setAnswer2,
    },
    {
      id: 2,
      name: "Would you rather a long or a short movie? (shortest being 1 and longest being 5)",
      answers: [
        { id: 0, name: "1" },
        { id: 1, name: "2" },
        { id: 2, name: "3" },
        { id: 3, name: "4" },
        { id: 4, name: "5" },
      ],
      multiple: false,
      set_values: setAnswer3,
    },
    {
      id: 3,
      name: "Are sequels ever as good as the original?",
      answers: [
        { id: 0, name: "Never" },
        { id: 1, name: "Rarely" },
        { id: 2, name: "Sometimes" },
        { id: 3, name: "Often" },
        { id: 4, name: "Always" },
      ],
      multiple: false,
      set_values: setAnswer4,
    },
    {
      id: 4,
      name: "How do you choose which movie to watch? By the genre? The main star? Or perhaps the popularity?",
      answers: [
        { id: 0, name: "By genre" },
        { id: 1, name: "The main star" },
        { id: 2, name: "Popularity" },
        { id: 3, name: "None of the above" },
      ],
      multiple: false,
      set_values: setAnswer5,
    },
    {
      id: 5,
      name: "Does the language of a movie neglibible?",
      answers: [
        { id: 0, name: "Strongly disagree" },
        { id: 1, name: "Disagree" },
        { id: 2, name: "Neither agree or disagree" },
        { id: 3, name: "Agree" },
        { id: 4, name: "Strongly agree" },
      ],
      multiple: false,
      set_values: setAnswer5,
    },
    {
      id: 5,
      name: "Do you have a knack for older movies? Or just the most newest ones?",
      answers: [
        { id: 0, name: "Old is gold!" },
        {
          id: 1,
          name: "Older movies are somewhat better than the ones we see now.",
        },
        { id: 2, name: "I don't mind either of them." },
        {
          id: 3,
          name: "Newest movies are somewhat better than the older ones.",
        },
        { id: 4, name: "Newest movies are far better!" },
      ],
      multiple: false,
      set_values: setAnswer5,
    },
    {
      id: 6,
      name: "Would you watch a movie with a lousy story but with popular casting and/or with bad ratings?",
      answers: [
        { id: 0, name: "Pft, nope." },
        {
          id: 1,
          name: "A popular cast? Don't mind if I do.",
        },
        { id: 2, name: "I'd watch it anyway." },
        {
          id: 3,
          name: "Reviews don't, but the story matters.",
        },
        { id: 4, name: "Heck yeah!" },
      ],
      multiple: false,
      set_values: setAnswer5,
    },
  ];

  const handleSubmit = () => {
    console.log(answer1, answer2, answer3, answer4, answer5);
  };

  return (
    <div
      className="modal fade"
      id="quizModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="quizModalTitle"
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
            <h5 className="modal-title" id="quizModalTitle">
              Recommendations Quiz
            </h5>
            <button
              type="button"
              className="primary-btn"
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
            className="modal-body quiz-container"
            style={{
              height: 400,
              overflowY: "scroll",
              background: "rgba(var(--light-rgb), 0.025)",
              borderRadius: 5,
              margin: "10px 15px",
            }}
          >
            {qna.map((item) => {
              return (
                <QuizItem
                  key={item.id}
                  id={item.id}
                  question={item.name}
                  multiple={item.multiple}
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
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
