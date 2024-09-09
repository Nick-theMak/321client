import React, { useEffect, useReducer } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { loadQuestions, updateStudentScore, socketUrl } from "../networking/api";
import DrawerAppBar from "../elements/DrawerAppBar";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import "./rooms.css";

const SECS_PER_QUESTION = 5; // Constant for the time per question

// Initial state for the useReducer hook
const initialState = {
  questions: [],
  status: "loading", // Possible states: 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

// Reducer function to manage state transitions based on action types
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      const newPoints =
        action.payload === question.correctOption
          ? state.points + question.points
          : state.points;

      // Only update the score if it's different
      // if (newPoints !== state.points) {
      //   updateStudentScore(newPoints); // Update score in the backend
      // }

      return {
        ...state,
        answer: action.payload,
        points: newPoints,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        highscore:
          state.secondsRemaining === 0
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "scoreUpdate":
      return {
        ...state,
        points: action.payload.newScore,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function Rooms() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadQuestions(1);
        console.log(data);
        dispatch({
          type: "dataReceived",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };

    fetchData();

    const socket = new SockJS(socketUrl);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("Connected");
        client.subscribe("/topic/scores", (message) => {
          const scoreUpdate = JSON.parse(message.body);
          dispatch({ type: "scoreUpdate", payload: scoreUpdate });
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <>
      <DrawerAppBar />
      <div className="wrapper">
        <div className="questionapp">
          <div className="headerWrapper">
            <Main>
              {status === "loading" && <Loader />}
              {status === "error" && <Error />}
              {status === "ready" && (
                <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
              )}
              {status === "active" && (
                <>
                  <Progress
                    index={index}
                    numQuestions={numQuestions}
                    points={points}
                    maxPossiblePoints={maxPossiblePoints}
                    answer={answer}
                  />
                  <Question
                    question={questions[index]}
                    dispatch={dispatch}
                    answer={answer}
                  />
                  <Footer>
                    <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                    <NextButton
                      dispatch={dispatch}
                      answer={answer}
                      numQuestions={numQuestions}
                      index={index}
                    />
                  </Footer>
                </>
              )}
              {status === "finished" && (
                <FinishScreen
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  highscore={highscore}
                  dispatch={dispatch}
                />
              )}
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}

