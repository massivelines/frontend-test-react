import React from 'react';
import { render } from '@testing-library/react';
import TodoList from '../components/todos/TodoList';

describe('everything renders correctly', () => {
  test('renders without errors', () => {
    render(<TodoList />);
  });

  test('render empty list of todo components', () => {
    const { getByTestId } = render(<TodoList />);

    const list = getByTestId('todo-list-list');
    expect(list.children.length).toEqual(0);
  });

  test('render list of todo components', () => {
    const todos = [
      { content: 'item 1', status: 'complete' },
      { content: 'item 2', status: 'incomplete' },
    ];

    const { getByTestId } = render(<TodoList todos={todos} />);

    const list = getByTestId('todo-list-list');
    expect(list.children.length).toEqual(2);
  });
});
