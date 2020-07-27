import React, { useReducer } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import todoListReducer from '../components/todos/todoListReducer';

const mockData = [
  {
    content: 'item 1',
    status: 'incomplete',
  },
  {
    content: 'item 2',
    status: 'complete',
  },
];

describe('updates state correctly', () => {
  test('it loads data correctly', () => {
    const { result } = renderHook(() => useReducer(todoListReducer, []));

    const [initialState, dispatch] = result.current;
    expect(initialState).toHaveLength(0);

    act(() => {
      dispatch({
        type: 'load-todo-data',
        data: mockData,
      });
    });

    const [state] = result.current;

    expect(state).toHaveLength(2);
    expect(state[0].id).not.toEqual(state[1].id);
    expect(typeof state[0].id).toBe('string');
    expect(state[0].content).toEqual('item 1');
    expect(state[0].status).toEqual('incomplete');
    expect(typeof state[1].id).toBe('string');
    expect(state[1].content).toEqual('item 2');
    expect(state[1].status).toEqual('complete');
  });

  test('it toggles status correctly', () => {
    const { result } = renderHook(() => useReducer(todoListReducer, []));

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'load-todo-data',
        data: mockData,
      });
    });

    act(() => {
      dispatch({
        type: 'toggle-status',
        data: { id: result.current[0][0].id },
      });
    });

    act(() => {
      dispatch({
        type: 'toggle-status',
        data: { id: result.current[0][1].id },
      });
    });

    const [state] = result.current;
    expect(state[0].status).toEqual('complete');
    expect(state[1].status).toEqual('incomplete');
  });

  test('it changes all statuses to compete', () => {
    const { result } = renderHook(() => useReducer(todoListReducer, []));

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'load-todo-data',
        data: mockData,
      });
    });

    act(() => {
      dispatch({
        type: 'complete-all',
      });
    });

    const [state] = result.current;
    expect(state[0].status).toEqual('complete');
    expect(state[1].status).toEqual('complete');
  });

  test('it removes all when all statuses are set to compete', () => {
    const { result } = renderHook(() => useReducer(todoListReducer, []));

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'load-todo-data',
        data: mockData,
      });
    });

    act(() => {
      dispatch({
        type: 'complete-all',
      });
    });

    act(() => {
      dispatch({
        type: 'remove-all',
      });
    });

    const [state] = result.current;
    expect(state).toHaveLength(0);
  });

  test('it adds a todo item to list', () => {
    const { result } = renderHook(() => useReducer(todoListReducer, []));

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'load-todo-data',
        data: mockData,
      });
    });

    act(() => {
      dispatch({
        type: 'add-todo',
        data: {
          content: 'item 3',
        },
      });
    });

    const [state] = result.current;

    expect(state).toHaveLength(3);
    expect(typeof state[2].id).toBe('string');
    // check if id is unique to item 3
    const findId = state.filter(({ id }) => id === state[2].id);
    expect(findId).toHaveLength(1);
    expect(state[2].content).toEqual('item 3');
    expect(state[2].status).toEqual('incomplete');
  });

  test('it removes a todo item from the list', () => {
    const { result } = renderHook(() => useReducer(todoListReducer, []));

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'load-todo-data',
        data: mockData,
      });
    });

    const firstItemId = result.current[0][0].id;

    act(() => {
      dispatch({
        type: 'remove-todo',
        data: {
          id: firstItemId,
        },
      });
    });

    const [state] = result.current;

    expect(state).toHaveLength(1);
    expect(state[0].id).not.toEqual(firstItemId);
    expect(state[0].content).toEqual('item 2');
  });
});
