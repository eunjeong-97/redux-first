import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    color: state.color,
    number: state.number
})

const mapDispatchToProps = dispatch => ({

})

const CounterContainer = () => {
    return (
        <div>

        </div>
    );
};

export default CounterContainer;