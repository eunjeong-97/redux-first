import * as types from '../actions/ActionTypes';

const initialState = {
    color: 'black',
    number: 0
};

// reducer: swtich case문
export default function counter(state = initialState, action) {
    switch (action.types) {
        case types.INCREMENT:
            return {
                ...state,
                number: state.number + 1
            };
        case types.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        case types.SET_COLOR:
            return {
                ...state,
                color: state.color
            };
        default:
            return state;
    }
}