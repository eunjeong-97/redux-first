import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import counter from '../reducers';

const Counter = ({ number, color, onIncrement, onDecrement, onSetColor }) => {
  return (
    <Container onClick={onIncrement} onContextMenu={e => {
      e.preventDefault();
      onDecrement();
    }} onDoubleClick={onSetColor} style={{ backgroundColor: color }}>
      {number}
    </Container>
  );
};

Counter.propTypes = {
  number: PropTypes.number,
  color: PropTypes.string,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onSetColor: PropTypes.func
};

Counter.defaultProps = {
  number: 0,
  color: 'black',
  onIncrement: counter,
  // onIncrement: () => console.warn('onIncrement not defined'),
  // onDecrement: () => console.warn('onDecrement not defined'),
  // onSetColor: () => console.warn('onSetColor not defined')
};

const Container = styled.div`
width: 10rem;
height: 10rem;
display: flex;
align-items: center;
justify-content: center;
margin: 1rem;
color: white;
font-size: 3rem;
border-radius: 100%;
cursor: pointer;
user-select: none;
transition: background-color 0.75s;`



export default Counter;