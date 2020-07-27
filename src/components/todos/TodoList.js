import React, { useEffect, useReducer } from 'react';
import todoListReducer from './todoListReducer';
import TodoListHeader from './TodoListHeader';
import Todo from './Todo';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => {
  const [todoListState, todoListDispatch] = useReducer(todoListReducer, []);

  // Loads up todo data on mounting
  useEffect(() => {
    if (todos) {
      todoListDispatch({
        type: 'load-todo-data',
        data: todos,
      });
    }
  }, []);

  // Add a Todo item
  const addTodo = (todoContent) =>
    todoListDispatch({
      type: 'add-todo',
      data: {
        content: todoContent,
      },
    });

  // Remove all Todo items
  const removeAll = () => {
    todoListDispatch({
      type: 'remove-all',
    });
  };

  // Complete All Todo items
  const completeAll = () =>
    todoListDispatch({
      type: 'complete-all',
    });

  // Toggle status of single Todo item
  const toggleStatus = (id) =>
    todoListDispatch({
      type: 'toggle-status',
      data: {
        id,
      },
    });

  // Remove single Todo item
  const removeTodo = (id) =>
    todoListDispatch({
      type: 'remove-todo',
      data: {
        id,
      },
    });

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-2/5">
        <TodoListHeader
          todoListState={todoListState}
          addTodo={addTodo}
          removeAll={removeAll}
          completeAll={completeAll}
        />
        <div data-testid="todo-list-list">
          {todoListState.map(({ id, content, status }) => (
            <Todo
              key={id}
              id={id}
              content={content}
              status={status}
              toggleStatus={toggleStatus}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['complete', 'incomplete']).isRequired,
    })
  ),
};

TodoList.defaultProp = {
  todos: [],
};

export default TodoList;
