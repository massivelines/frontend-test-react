import { v4 as uuidv4 } from 'uuid';

const todoListReducer = (state, action) => {
  switch (action.type) {
    case 'load-todo-data':
      // when loading existing data add a unique id to every item
      return action.data.map((item) => ({
        id: uuidv4(),
        ...item,
      }));

    case 'toggle-status':
      // toggle the status of a todo item
      return state.map((item) => {
        if (item.id === action.data.id) {
          return {
            ...item,
            status: item.status === 'complete' ? 'incomplete' : 'complete',
          };
        }
        return item;
      });

    case 'complete-all':
      // Change all todos to completed
      return state.map((item) => {
        return {
          ...item,
          status: 'complete',
        };
      });

    case 'add-todo':
      // Add todo
      return [
        ...state,
        {
          id: uuidv4(),
          content: action.data.content,
          status: 'incomplete',
        },
      ];

    case 'remove-todo':
      // remove a todo item
      return state.filter(({ id }) => id !== action.data.id);

    case 'remove-all':
      // remove all todos and return empty array
      return [];

    default:
      // Throw error if action is not found
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default todoListReducer;
