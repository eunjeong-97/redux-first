import { handleActions, createAction } from 'redux-actions'
import { INCREMENT, DECREMENT } from './ActionTypes'

const initialState = {
    color: 'black',
    number: 0
};

// action creator
export const increment = createAction(INCREMENT)
export const decrement = createAction(DECREMENT)

// 비동기 dispatch
export const incrementAsync = () => dispatch => {
    setTimeout(() => dispatch(increment()), 1000);
}

export const decrementAsync = () => dispatch => {
    setTimeout(() => dispatch(decrement()), 1000)
}

