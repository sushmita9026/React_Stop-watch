
import React, { useState, useEffect, useReducer } from 'react';
import './App.css';

const initialState = { milliseconds: 0, running: false };

function reducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...state, running: true };
    case 'STOP':
      return { ...state, running: false };
    case 'RESET':
      return initialState;
    case 'TICK':
      return { ...state, milliseconds: state.milliseconds + 100 }; 
    default:
      return state;
  }
}

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const ms = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, '0'); 

  return `${hours}:${minutes}:${seconds}:${ms}`;
};

const Stopwatch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let timer;
    if (state.running) {
      timer = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 100); 
    }
    return () => clearInterval(timer);
  }, [state.running]);

  const handleStart = () => {
    dispatch({ type: 'START' });
  };

  const handleStop = () => {
    dispatch({ type: 'STOP' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>{formatTime(state.milliseconds)}</div>
      <button onClick={handleStart} disabled={state.running}>
        Start
      </button>
      <button onClick={handleStop} disabled={!state.running}>
        Stop
      </button>
      <button onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
