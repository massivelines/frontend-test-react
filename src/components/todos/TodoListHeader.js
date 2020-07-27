import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TodoListHeader = ({ todoListState, addTodo, removeAll, completeAll }) => {
  const [allTodosCompleted, setAllTodosCompleted] = useState(false);
  const [todoInputValue, setTodoInputValue] = useState('');

  // loop through all the todos when updated and check if all are complete, if empty array set to false
  useEffect(() => {
    const allCompleted =
      todoListState.length > 0
        ? !todoListState.some((item) => item.status === 'incomplete')
        : false;

    setAllTodosCompleted(allCompleted);
  }, [todoListState]);

  // On submit or Add button, pass input content to addTodo and reset value
  const addTodoSubmit = (event) => {
    event.preventDefault();

    if (todoInputValue.length > 0) {
      addTodo(todoInputValue);
      setTodoInputValue('');
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <h1 className="text-gray-darkest text-3xl font-bold">Todo List</h1>
        {/* If all todos are completed show "Remove All" button, 
            else show "Complete All" button, and if todoState is empty disable button */}
        {allTodosCompleted ? (
          <button
            className={
              'flex-no-shrink p-2 border-2 rounded hover:text-white text-red-700 border-red-700  hover:bg-red-700'
            }
            data-testid="todo-header-button-remove-all"
            onClick={removeAll}
          >
            Remove All
          </button>
        ) : (
          <button
            className={`flex-no-shrink p-2 border-2 rounded hover:text-white text-teal-300 border-teal-300 hover:bg-teal-300
              ${
                todoListState.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }
              `}
            data-testid="todo-header-button-complete-all"
            disabled={todoListState.length === 0}
            onClick={completeAll}
          >
            Complete All
          </button>
        )}
      </div>
      <form data-testid="todo-header-form" onSubmit={addTodoSubmit}>
        <div className="flex my-8">
          <label className="w-full mr-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-darker"
              placeholder="Add Todo"
              id="todoContent"
              data-testid="todo-header-input-add-todo"
              value={todoInputValue}
              onChange={(event) => setTodoInputValue(event.target.value)}
            />
          </label>
          <button
            type="submit"
            className={`flex-no-shrink p-2 border-2 rounded text-teal-700 border-teal-700 hover:text-white hover:bg-teal-700
                ${
                  todoInputValue.length === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
            disabled={todoInputValue.length === 0}
            data-testid="todo-header-button-submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

TodoListHeader.propTypes = {
  todoListState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['complete', 'incomplete']).isRequired,
    })
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
  completeAll: PropTypes.func.isRequired,
};

export default TodoListHeader;
