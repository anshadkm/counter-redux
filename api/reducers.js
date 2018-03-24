import { combineReducers } from 'redux';

import movie from './movie.reducer'
import counter from './counter.reducer'

export default combineReducers({
    movie,
    counter
});