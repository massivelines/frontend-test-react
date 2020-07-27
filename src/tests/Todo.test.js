import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import Todo from '../components/todos/Todo';

test('renders without errors', () => {
  render(
    <Todo
      id="uuid"
      content=""
      status="complete"
      toggleStatus={() => {}}
      removeTodo={() => {}}
    />
  );
});

test('renders content', () => {
  const { getByText } = render(
    <Todo
      id="uuid"
      content="Some Content"
      status="complete"
      toggleStatus={() => {}}
      removeTodo={() => {}}
    />
  );
  expect(getByText(/some content/i)).toBeInTheDocument();
});

test('complete button has correct text and calls function', () => {
  const onClick = jest.fn();

  const { getByTestId } = render(
    <Todo
      id="uuid"
      content="Some Content"
      status="complete"
      toggleStatus={onClick}
      removeTodo={() => {}}
    />
  );

  const button = getByTestId('todo-button-complete');
  user.click(button);
  expect(button).toHaveTextContent(/done/i);
  expect(onClick).toHaveBeenCalled();
});

test('incomplete button has correct text and calls function', () => {
  const onClick = jest.fn();

  const { getByTestId } = render(
    <Todo
      id="uuid"
      content="Some Content"
      status="incomplete"
      toggleStatus={onClick}
      removeTodo={() => {}}
    />
  );

  const button = getByTestId('todo-button-incomplete');
  user.click(button);
  expect(button).toHaveTextContent(/not done/i);
  expect(onClick).toHaveBeenCalled();
});

test('remove button has correct text and calls function', () => {
  const onClick = jest.fn();

  const { getByTestId } = render(
    <Todo
      id="uuid"
      content="Some Content"
      status="complete"
      toggleStatus={() => {}}
      removeTodo={onClick}
    />
  );

  const button = getByTestId('todo-button-remove');
  user.click(button);
  expect(button).toHaveTextContent(/remove/i);
  expect(onClick).toHaveBeenCalled();
});

test('changes complete to incomplete button based on props', () => {
  const onClick = jest.fn();

  const { getByTestId, queryByTestId, rerender } = render(
    <Todo
      id="uuid"
      content=""
      status="complete"
      toggleStatus={() => {}}
      removeTodo={() => {}}
    />
  );

  const completeButton = queryByTestId('todo-button-complete');
  const incompleteButton = queryByTestId('todo-button-incomplete');

  expect(completeButton).toBeInTheDocument();
  expect(incompleteButton).not.toBeInTheDocument();

  rerender(
    <Todo
      id="uuid"
      content=""
      status="incomplete"
      toggleStatus={() => {}}
      removeTodo={() => {}}
    />
  );

  const completeButtonRerender = queryByTestId('todo-button-complete');
  const incompleteButtonRerender = getByTestId('todo-button-incomplete');

  expect(completeButtonRerender).not.toBeInTheDocument();
  expect(incompleteButtonRerender).toBeInTheDocument();
});
