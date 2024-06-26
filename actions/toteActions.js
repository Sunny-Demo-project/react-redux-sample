import axios from 'axios';
import { api } from '../config/env';
import { GET_TOTE, GET_TOTES, UPDATE_TOTE, ADD_TOTE, DELETE_TOTE, CREATE_TOTE, 
    GET_TOTE_TYPES, GET_TOTES_BY_ACTIVE  } from '../config/actionNames';
const PATH = 'totes/';
export function getTotes() {
    return dispatch => {
        axios
            .get(`${api}${PATH}`)
            .then(response => {
                dispatch({ type: GET_TOTES, payload: response.data });
            })
            .catch(err => { });
    };
}
export function getTote(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: GET_TOTE, payload: response.data });
            })
            .catch(err => { });
    };
}

export function deleteTote(id) {
    return dispatch => {
        axios
            .delete(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: DELETE_TOTE, payload: response.data });
                dispatch(getTotes());
            })
            .catch(err => { });
    };
}

export function updateTote(id, payload) {
    return dispatch => {
        axios
            .put(`${api}${PATH}${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_TOTE, payload: response.data });
            })
            .catch(err => { });
    };
}
export function addTote(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}`, payload)
            .then(response => {
                dispatch({ type: ADD_TOTE, payload: response.data });
            })
            .catch(err => {});
    };
}

export function createTote(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}create`, payload)
            .then(response => {
                dispatch({ type: CREATE_TOTE, payload: response.data });
                dispatch(getTotes());
            })
            .catch(err => {});
    };
}

export function getToteTypes() {
    return dispatch => {
        axios
            .get(`${api}${PATH}types`)
            .then(response => {
                dispatch({ type: GET_TOTE_TYPES, payload: response.data });
            })
            .catch(err => {});
    };
}

export function getTotesByActive(params) {
    return dispatch => {
        axios
            .get(`${api}${PATH}byActive`, {params})
            .then(response => {
                dispatch({ type: GET_TOTES_BY_ACTIVE, payload: response.data });
            })
            .catch(err => { });
    };
}