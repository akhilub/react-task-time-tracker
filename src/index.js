import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import TaskCreator from './TaskCreator';
import TasksList from './TasksList';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <TaskCreator />
      <TasksList />
    </div>
  </Provider>,
  document.getElementById('root')
);
