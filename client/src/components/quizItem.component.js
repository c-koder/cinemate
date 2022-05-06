const QuizItem = ({ id, multiple, question, values, setValues }) => {
  return (
    <div>
      <div style={{ marginBottom: 10 }}>{id + 1 + ". " + question}</div>
      <hr style={{ margin: "0px 0px 10px" }} />
      {multiple ? (
        <div>
          {values.map((value) => {
            return (
              <label key={value.id}>
                <input
                  type="checkbox"
                  className="quiz-option checkbox"
                  name={id}
                  value={value.id}
                  onChange={() =>
                    setValues(
                      Array.from(
                        document.querySelectorAll(
                          `input[type=checkbox][name='${id}']:checked`
                        ),
                        (e) => parseInt(e.value, 10)
                      )
                    )
                  }
                />
                {value.name}
              </label>
            );
          })}
        </div>
      ) : (
        <div>
          {values.map((value) => {
            return (
              <label key={value.id}>
                <input
                  type="radio"
                  className="quiz-option radio"
                  name={id}
                  value={value.id}
                  onChange={(e) =>
                    setValues(parseInt(e.currentTarget.value, 10))
                  }
                />
                {value.name}
              </label>
            );
          })}
        </div>
      )}
      <br />
    </div>
  );
};

export default QuizItem;
