import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';
import { messages, SERVER_API_URL } from '../config/constants';

export const ACTION_TYPES = {
    FETCH_MOVIES: 'movie/FETCH_MOVIES',
    FETCH_FIELD:  'field/FETCH_FIELD',
    CREATE_FIELD: 'field/CREATE_FIELD',
    UPDATE_FIELD: 'field/UPDATE_FIELD',
    DELETE_FIELD: 'field/DELETE_FIELD'
};

const initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: {},
    updating: false,
    updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_MOVIES):
        case REQUEST(ACTION_TYPES.FETCH_FIELD):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CREATE_FIELD):
        case REQUEST(ACTION_TYPES.UPDATE_FIELD):
        case REQUEST(ACTION_TYPES.DELETE_FIELD):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.FETCH_MOVIES):
        case FAILURE(ACTION_TYPES.FETCH_FIELD):
        case FAILURE(ACTION_TYPES.CREATE_FIELD):
        case FAILURE(ACTION_TYPES.UPDATE_FIELD):
        case FAILURE(ACTION_TYPES.DELETE_FIELD):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_MOVIES):
            return {
                ...state,
                loading: false,
                entities: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.FETCH_FIELD):
            return {
                ...state,
                loading: false,
                entity: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CREATE_FIELD):
        case SUCCESS(ACTION_TYPES.UPDATE_FIELD):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_FIELD):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: {}
            };
        default:
            return state;
    }
};

const apiUrl = SERVER_API_URL + '/movies.json';

// Actions

export const getEntities = (page, size, sort) => ({
    type: ACTION_TYPES.FETCH_MOVIES,
    payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_FIELD,
        payload: axios.get(requestUrl)
    };
};

export const createEntity = entity => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_FIELD,
        meta: {
            successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
            errorMessage: messages.DATA_UPDATE_ERROR_ALERT
        },
        payload: axios.post(apiUrl, entity)
    });
    dispatch(getEntities());
    return result;
};

export const updateEntity = entity => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_FIELD,
        meta: {
            successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
            errorMessage: messages.DATA_UPDATE_ERROR_ALERT
        },
        payload: axios.put(apiUrl, entity)
    });
    dispatch(getEntities());
    return result;
};

export const deleteEntity = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_FIELD,
        meta: {
            successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
            errorMessage: messages.DATA_UPDATE_ERROR_ALERT
        },
        payload: axios.delete(requestUrl)
    });
    dispatch(getEntities());
    return result;
};
