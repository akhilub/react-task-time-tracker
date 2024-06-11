import React from 'react';
import { useSelector } from 'react-redux';

const TasksList = () => {
  const tasks = useSelector((state) => state.tasks);

  const groupedTasks = tasks.reduce((acc, task) => {
    const existingTask = acc.find((t) => t.name === task.name);
    if (existingTask) {
      existingTask.time += task.time;
      existingTask.id = Math.min(existingTask.id, task.id);
    } else {
      acc.push({ ...task });
    }
    return acc;
  }, []);

  const sortedTasks = groupedTasks.sort((a, b) => a.id - b.id);

  const totalTime = sortedTasks.reduce((acc, task) => acc + task.time, 0);

  return (
    <div>
      <ul id="tasks">
        {sortedTasks.map((task) => (
          <li key={task.id} className="task">
            <span className="id">{task.id}</span>
            <span className="name">{task.name}</span>
            <span className="time">{task.time}</span>
          </li>
        ))}
      </ul>
      <div id="total">{totalTime}</div>
    </div>
  );
};

export default TasksList;
