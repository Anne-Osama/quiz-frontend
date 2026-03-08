import React, { useState, useEffect } from "react";
import "./App.css";

const questions = [
  {
    question:"What is the capital of France?",
    options:["London","Paris","Berlin","Madrid"],
    answer:"Paris"
  },
  {
    question:"Which planet is the Red Planet?",
    options:["Mars","Venus","Earth","Jupiter"],
    answer:"Mars"
  },
  {
    question:"Which language runs in the browser?",
    options:["Python","Java","JavaScript","C++"],
    answer:"JavaScript"
  },
  {
    question:"What does HTML stand for?",
    options:[
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Mark Language",
      "Hyper Tool Multi Language"
    ],
    answer:"Hyper Text Markup Language"
  },
  {
    question:"How many continents are there in the world?",
    options:[
      "four",
      "five",
      "six",
      "seven"
    ],
    answer:"seven"
  },
];

function App(){

  const [started,setStarted]=useState(false);
  const [current,setCurrent]=useState(0);
  const [score,setScore]=useState(0);
  const [finished,setFinished]=useState(false);
  const [time,setTime]=useState(15);
  const [selected,setSelected]=useState(null);

  useEffect(()=>{
    if(!started || finished) return;

    if(time===0){
      nextQuestion();
      return;
    }

    const timer=setTimeout(()=>{ setTime(time-1); },1000);
    return ()=>clearTimeout(timer);
  },[time,started]);

  const answer=(option)=>{
    setSelected(option);
    if(option===questions[current].answer){
      setScore(score+1);
    }
    setTimeout(()=>{
      nextQuestion();
      setSelected(null);
    },800);
  };

  const nextQuestion=()=>{
    const next=current+1;
    if(next<questions.length){
      setCurrent(next);
      setTime(15);
    } else {
      setFinished(true);
    }
  };

  const restart=()=>{
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setTime(15);
  };

  return(
    <div className="container">
      <h1 className="title">🌈 Happy Quiz</h1>

      {!started ? (
        <div className="card">
          <h2>Ready to play?</h2>
          <button className="startBtn" onClick={()=>setStarted(true)}>Start Quiz</button>
        </div>
      ) : finished ? (
        <div className="card">
          <h2>🎉 Your Score</h2>
          <p className="score">{score} / {questions.length}</p>
          <button className="startBtn" onClick={restart}>Play Again</button>
        </div>
      ) : (
        <div className="card">
          <p className="timer">⏱ {time}s</p>
          <h2>{questions[current].question}</h2>
          <div className="options">
            {questions[current].options.map((option,index)=>{
              let className="optionBtn";
              if(selected){
                if(option===questions[current].answer){
                  className="correct";
                } else if(option===selected){
                  className="wrong";
                }
              }
              return(
                <button key={index} onClick={()=>answer(option)} className={className}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;