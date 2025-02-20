function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null;
  
    return (
      <div>
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.answer
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={index}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }
  
  export default Options;