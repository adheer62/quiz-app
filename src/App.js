import React, { useEffect, useReducer } from 'react'
import Header from './components/Header';
import Main from './components/Main'
import Loader from './components/Loader';
import Error from "./components/Error";
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progess from './components/Progess';
import FinishScreen from './components/FinishScreen';

const initialState = {
  questions: [],
  index: 0,
  answer:null,
  points: 0,
  highScore:0,

  // 'loading', 'error', 'active', 'finished'
  status: "loading",
};

function reducer(state,action){
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
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer:null,
        index: state.index +1,

      };
    case 'finish':
      return {
        ...state,
        status: "finish",
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
      };
    case 'reset':
      return {
        ...state,
        // questions: [],
        index: 0,
        answer: null,
        points: 0,
        // highScore: 0,

        // 'loading', 'error', 'active', 'finished'
        status: "ready",
      };
    default:
      throw new Error("Action unknown");
  }
}

const App = () => {
  const [{questions,status,index,answer,points,highScore},dispatch] = useReducer(reducer,initialState);

  const numQuestions = questions.length
  const maxPoints = questions.reduce((acc,curr)=> curr.points+ acc,0)

  useEffect(function(){
    fetch('http://localhost:8000/questions')
    .then((res)=> res.json())
    .then((data)=>dispatch({type: 'dataReceived',payload: data}))
    .catch((err)=> dispatch({type:'dataFailed'}))
  },[]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progess
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App