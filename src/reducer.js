import { ADD_TASK } from './actions';

export const initialState = {
  tasks: [],
  nextId: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const newTask = {
        id: state.nextId,
        name: action.payload.name,
        time: action.payload.time,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        nextId: state.nextId + 1,
      };
    default:
      return state;
  }
};

export default reducer;
