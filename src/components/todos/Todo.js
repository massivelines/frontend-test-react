import React from 'react';

export function Todo({ todo, key }) {
    return <h4 key={key}>{todo.content}</h4>;
}
