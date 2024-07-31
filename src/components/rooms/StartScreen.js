function StartScreen({ numQuestions, dispatch }) {
    return (
      <div className="start">
        <h2>Welcome to "insert quiz name here""</h2>
        <h3>{numQuestions} to test your knowledge on "Cypersecurity" </h3>
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