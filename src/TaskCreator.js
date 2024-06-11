import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './actions';

const TaskCreator = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const handleStart = () => {
    setIsRunning(true);
    const newTimer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);
    setTimer(newTimer);
  };

  const handleStop = () => {
    clearInterval(timer);
    setIsRunning(false);
    if (timeElapsed > 0) {
      dispatch(addTask({ name: taskName, time: timeElapsed }));
      setTaskName('');
      setTimeElapsed(0);
    }
  };

  const handleTimeFieldChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setTimeElapsed(value);
    if (isRunning) {
      clearInterval(timer);
      setTimer(null);
      setIsRunning(false);
    }
  };

  const handleTimeFieldFocus = () => {
    if (isRunning) {
      clearInterval(timer);
      setTimer(null);
      setIsRunning(false);
    }
  };

  const handleTimeFieldBlur = () => {
    if (!isRunning && timeElapsed > 0) {
      const newTimer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(newTimer);
      setIsRunning(true);
    }
  };

  return (
    <div>
      <input
        id="taskName"
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <input
        id="timeField"
        type="number"
        value={timeElapsed}
        onChange={handleTimeFieldChange}
        onFocus={handleTimeFieldFocus}
        onBlur={handleTimeFieldBlur}
      />
      <button id="start" onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button id="stop" onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
    </div>
  );
};

export default TaskCreator;
