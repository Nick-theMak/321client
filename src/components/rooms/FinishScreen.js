import React from "react";
import { useNavigate } from "react-router-dom";




function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {

    const navigate = useNavigate();

    const returnHome = () => {
        navigate('/');
    };
    const percentage = (points / maxPossiblePoints) * 100;
  
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
  
    return (
      <div className="result_container">
        <p className="result">
          <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
          {maxPossiblePoints} ({Math.ceil(percentage)}%)
        </p>
        <p className="highscore">(Highscore: {highscore} points)</p>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart quiz
        </button>
        <button
          className="btn btn-ui"
          onClick= {returnHome}
        >
          Return to home page
        </button>
      </div>
    );
  }
  
  export default FinishScreen;