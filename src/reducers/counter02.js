import { handleActions } from 'redux-actions'
import { INCREMENT, DECREMENT } from '../actions/ActionTypes'

// reducer는 switch case문으로 만들어지지만, 스코프의 문제로 인해 대신 handleActions() 함수를 사용할 수 있다. 결론은 reducer
export default handleActions({
    // 여기서 key값은 actionType들이다.
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1,
}, 0)
