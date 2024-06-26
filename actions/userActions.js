import axios from 'axios';
import { api } from '../config/env';
import { GET_USER, GET_USERS, UPDATE_USER, ADD_USER, DELETE_USER, GET_USERS_BY_PAGE } from '../config/actionNames';
const PATH = 'users/';
export function getUsers() {
    return dispatch => {
        axios
            .get(`${api}${PATH}`)
            .then(response => {
                dispatch({ type: GET_USERS, payload: response.data });
            })
            .catch(err => { });
    };
}
export function getUser(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: GET_USER, payload: response.data });
            })
            .catch(err => { });
    };
}

export function deleteUser(id) {
    return dispatch => {
        axios
            .delete(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: DELETE_USER, payload: response.data });
            })
            .catch(err => { });
    };
}

export function updateUser(id, payload) {
    return dispatch => {
        axios
            .put(`${api}${PATH}${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_USER, payload: response.data });
            })
            .catch(err => { });
    };
}
export function addUser(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}`, payload)
            .then(response => {
                dispatch({ type: ADD_USER, payload: response.data });
            })
            .catch(err => {});
    };
}

export function getUsersByPage(params) {
    return dispatch => {
        axios
            .get(`${api}${PATH}byPage`, {params})
            .then(response => {
                dispatch({ type: GET_USERS_BY_PAGE, payload: response.data });
            })
            .catch(err => { });
    };
}
