const SurveyItem = ({
  qNum,
  id,
  multiple,
  question,
  ans,
  values,
  setValues,
}) => {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>{qNum + 1 + ". " + question}</div>
      <hr style={{ margin: "0px 0px 6px" }} />
      {multiple ? (
        <div>
          {values.map((value) => {
            var checked = ans && ans.some((temp) => temp === value.id);
            return (
              <label key={value.id}>
                <input
                  type="checkbox"
                  className="survey-option checkbox"
                  name={id}
                  value={value.id}
                  checked={checked}
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
                  className="survey-option radio"
                  name={id}
                  value={value.id}
                  checked={value.id === ans && ans}
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

export default SurveyItem;
