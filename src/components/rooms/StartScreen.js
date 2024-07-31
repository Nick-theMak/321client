function StartScreen({ numQuestions, dispatch }) {
    return (
      <div className="start">
        <h2>Welcome Capture the Future's practice quiz!</h2>
        <h3>{numQuestions} to test your general knowledge on cybersecurity! </h3>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's start
        </button>
      </div>
    );
  }
  
  export default StartScreen;