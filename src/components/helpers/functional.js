import React from 'react';

export function ComponentMap(props) {
    const name = props.component.name.toLowerCase();
    const MapTo = props.component;

    if (props.array.length === 0) {
        return <h1>No {name.charAt(0).toUpperCase() + name.slice(1)}</h1>;
    }

    return props.array.map((item, index) => MapTo({
      ...props.props,
      [name]: item,
      key: `${name}-${index}`
    }));
}
