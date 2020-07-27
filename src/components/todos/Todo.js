import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ id, content, status, toggleStatus, removeTodo }) => {
  return (
    <div className="flex mb-4 items-center justify-between">
      <div>
        <div className="flex-grow text-gray-darkest">{content}</div>
      </div>
      <div>
        {status === 'complete' ? (
          <button
            className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-700 border-green-700 hover:bg-green-700"
            data-testid="todo-button-complete"
            onClick={() => toggleStatus(id)}
          >
            Done
          </button>
        ) : (
          <button
            className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-500 border-gray-500 hover:bg-gray-500"
            data-testid="todo-button-incomplete"
            onClick={() => toggleStatus(id)}
          >
            Not Done
          </button>
        )}
        <button
          className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-700 border-red-700 hover:text-white hover:bg-red-700"
          data-testid="todo-button-remove"
          onClick={() => removeTodo(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['complete', 'incomplete']).isRequired,
  toggleStatus: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default Todo;
