import axios from 'axios';
import { api } from '../config/env';
import { GET_BIN, GET_BINS, UPDATE_BIN, ADD_BIN, DELETE_BIN, CREATE_BIN, GET_BIN_TYPES, GET_BINS_BY_ACTIVE } from '../config/actionNames';
const PATH = 'bins/';
export function getBins() {
    return dispatch => {
        axios
            .get(`${api}${PATH}`)
            .then(response => {
                dispatch({ type: GET_BINS, payload: response.data });
            })
            .catch(err => { });
    };
}
export function getBin(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: GET_BIN, payload: response.data });
            })
            .catch(err => { });
    };
}

export function deleteBin(id) {
    return dispatch => {
        axios
            .delete(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: DELETE_BIN, payload: response.data });
                dispatch(getBinsByActive());
            })
            .catch(err => { });
    };
}

export function updateBin(id, payload) {
    return dispatch => {
        axios
            .put(`${api}${PATH}${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_BIN, payload: response.data });
            })
            .catch(err => { });
    };
}
export function addBin(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}`, payload)
            .then(response => {
                dispatch({ type: ADD_BIN, payload: response.data });
            })
            .catch(err => {});
    };
}

export function createBin(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}create`, payload)
            .then(response => {
                dispatch({ type: CREATE_BIN, payload: response.data });
                dispatch(getBinsByActive());
            })
            .catch(err => {});
    };
}

export function getBinTypes() {
    return dispatch => {
        axios
            .get(`${api}${PATH}types`)
            .then(response => {
                dispatch({ type: GET_BIN_TYPES, payload: response.data });
            })
            .catch(err => {});
    };
}

export function getBinsByActive(params) {
    return dispatch => {
        axios
            .get(`${api}${PATH}byActive`, {params})
            .then(response => {
                dispatch({ type: GET_BINS_BY_ACTIVE, payload: response.data });
            })
            .catch(err => { });
    };
}