import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// state를 변경하기 위해 reducer가 아니라 actions파일에 있는 dispatch를 사용할 것이다.
import * as actions from '../actions/counter'

const CounterContainer = (props) => {
    console.log(props)
    return (
        <div>
            {/* <h1>{number}</h1> */}
            <button onClick={actions.incrementAsync}>+</button>
            <button onClick={actions.decrementAsync}>-</button>
        </div>
    );
};

export default CounterContainer;