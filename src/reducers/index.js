import { combineReducers } from 'redux';

import counter from './counter';
import counter02 from './counter02';

export default combineReducers({
    counter,
    counter02,
});