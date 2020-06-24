import React from 'react';
import './App.css';
import { todos, notodos } from './data/todos';
import { Todo } from './components/todos';
import { ComponentMap } from './components/helpers';

function App() {

  return (
    <div className="App">
      <ComponentMap
        array={todos}
        component={Todo}
      />
    </div>
  );
}

export default App;
