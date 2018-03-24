import { SUCCESS } from './action-type.util';

export const ACTION_TYPES = {
    INCREMENT_COUNTER: 'counter/INCREMENT_COUNTER',
    CLEAR_COUNTER: 'counter/CLEAR_COUNTER'
};

const initialState = {
    count: 0
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS(ACTION_TYPES.FETCH_MOVIES):
            return {
                ...state,
                count: action.payload
            };
        case SUCCESS(ACTION_TYPES.CLEAR_COUNTER):
            return {
                ...state,
                count: 0
            }
        default:
            return state;
    }
};

// Actions

export const incrementCounter = (count) => ({
    type: SUCCESS(ACTION_TYPES.FETCH_MOVIES),
    payload: count + 1
});

export const clearCounter = () => ({
    type: SUCCESS(ACTION_TYPES.CLEAR_COUNTER)
})