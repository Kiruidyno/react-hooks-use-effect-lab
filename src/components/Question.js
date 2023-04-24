import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let interval = null;
    let timeout = null;

    const decrementTimeRemaining = () => {
      setTimeRemaining((prevTime) => prevTime - 1);
    };

    const handleTimeout = () => {
      setTimeRemaining(10);
      onAnswered(false);
    };

    interval = setInterval(decrementTimeRemaining, 1000);
    timeout = setTimeout(handleTimeout, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
