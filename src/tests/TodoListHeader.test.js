import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import TodoListHeader from '../components/todos/TodoListHeader';
import userEvent from '@testing-library/user-event';

test('renders without errors', () => {
  render(
    <TodoListHeader
      todoListState={[]}
      addTodo={() => {}}
      removeAll={() => {}}
      completeAll={() => {}}
    />
  );
});

test('complete all button has correct text and calls function', () => {
  const onClick = jest.fn();

  const todoListState = [
    {
      id: '1',
      content: 'content 1',
      status: 'incomplete',
    },
    {
      id: '2',
      content: 'content 2',
      status: 'complete',
    },
  ];

  const { getByTestId } = render(
    <TodoListHeader
      todoListState={todoListState}
      addTodo={() => {}}
      removeAll={() => {}}
      completeAll={onClick}
    />
  );

  const button = getByTestId('todo-header-button-complete-all');
  user.click(button);
  expect(button).toHaveTextContent(/complete all/i);
  expect(onClick).toHaveBeenCalled();
});

test('remove all button has correct text and calls function', () => {
  const onClick = jest.fn();

  const todoListState = [
    {
      id: '1',
      content: 'content 1',
      status: 'complete',
    },
    {
      id: '2',
      content: 'content 2',
      status: 'complete',
    },
  ];

  const { getByTestId } = render(
    <TodoListHeader
      todoListState={todoListState}
      addTodo={() => {}}
      removeAll={onClick}
      completeAll={() => {}}
    />
  );

  const button = getByTestId('todo-header-button-remove-all');
  user.click(button);
  expect(button).toHaveTextContent(/remove all/i);
  expect(onClick).toHaveBeenCalled();
});

test('complete all button is disabled if todoListState is empty array', () => {
  const { getByTestId, debug } = render(
    <TodoListHeader
      todoListState={[]}
      addTodo={() => {}}
      removeAll={() => {}}
      completeAll={() => {}}
    />
  );

  const button = getByTestId('todo-header-button-complete-all');
  expect(button).toHaveTextContent(/complete all/i);
  expect(button).toHaveAttribute('disabled');
});

test('add button has correct text and is disabled with no input text', () => {
  const { getByTestId } = render(
    <TodoListHeader
      todoListState={[]}
      addTodo={() => {}}
      removeAll={() => {}}
      completeAll={() => {}}
    />
  );

  const button = getByTestId('todo-header-button-submit');
  expect(button).toHaveTextContent(/add/i);
  expect(button).toHaveAttribute('disabled');
});

test('input has correct text and takes input value', () => {
  const { getByTestId } = render(
    <TodoListHeader
      todoListState={[]}
      addTodo={() => {}}
      removeAll={() => {}}
      completeAll={() => {}}
    />
  );

  const input = getByTestId('todo-header-input-add-todo');
  userEvent.type(input, 'todo item');

  expect(input.value).toBe('todo item');
});

test('input has value add button can call function', async () => {
  const onSubmit = jest.fn();

  const { getByTestId } = render(
    <TodoListHeader
      todoListState={[]}
      addTodo={onSubmit}
      removeAll={() => {}}
      completeAll={() => {}}
    />
  );

  const input = getByTestId('todo-header-input-add-todo');
  const button = getByTestId('todo-header-button-submit');

  user.type(input, 'todo item');
  user.click(button);

  expect(onSubmit).toHaveBeenCalled();
  expect(input.value).toBe('');
});

test('input has value "return key" call function and stays on input', async () => {
  const onSubmit = jest.fn();

  const { getByTestId, debug } = render(
    <TodoListHeader
      todoListState={[]}
      addTodo={onSubmit}
      removeAll={() => {}}
      completeAll={() => {}}
    />
  );

  const input = getByTestId('todo-header-input-add-todo');

  input.focus()
  user.type(input, 'todo item');
  fireEvent.submit(input);

  expect(onSubmit).toHaveBeenCalled();
  expect(input.value).toBe('');

  expect(input).toHaveFocus();

  user.type(input, 'test');
  expect(input.value).toBe('test');
});
