import axios from 'axios';
import { api } from '../config/env';
import { GET_ACTION, GET_ACTIONS, UPDATE_ACTION, ADD_ACTION, DELETE_ACTION, 
    GET_ACTIONS_BY_ORDER, GET_ACTIONS_BY_PRODUCT, GET_LAST_ACTIONS_BY_USERS, GET_ACTIONS_BY_USER } from '../config/actionNames';
const PATH = 'actions/';
export function getActions() {
    return dispatch => {
        axios
            .get(`${api}${PATH}`)
            .then(response => {
                dispatch({ type: GET_ACTIONS, payload: response.data });
            })
            .catch(err => { });
    };
}
export function getAction(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: GET_ACTION, payload: response.data });
            })
            .catch(err => { });
    };
}

export function deleteAction(id) {
    return dispatch => {
        axios
            .delete(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: DELETE_ACTION, payload: response.data });
            })
            .catch(err => { });
    };
}

export function updateAction(id, payload) {
    return dispatch => {
        axios
            .put(`${api}${PATH}${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_ACTION, payload: response.data });
            })
            .catch(err => { });
    };
}
export function addAction(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}`, payload)
            .then(response => {
                dispatch({ type: ADD_ACTION, payload: response.data });
            })
            .catch(err => {});
    };
}

export function getActionsByOrder(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}order/${id}`)
            .then(response => {
                dispatch({ type: GET_ACTIONS_BY_ORDER, payload: response.data });
            })
            .catch(err => { });
    };
}

export function getActionsByProduct(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}product/${id}`)
            .then(response => {
                dispatch({ type: GET_ACTIONS_BY_PRODUCT, payload: response.data });
            })
            .catch(err => { });
    };
}

export function getActionsByUser(userName) {
    return dispatch => {
        axios
            .get(`${api}${PATH}user/${userName}`)
            .then(response => {
                dispatch({ type: GET_ACTIONS_BY_USER, payload: response.data });
            })
            .catch(err => { });
    };
}

export function getLastActionByUsers(userNames) {
    return dispatch => {
        axios
            .post(`${api}${PATH}usersLastAction`, userNames)
            .then(response => {
                dispatch({ type: GET_LAST_ACTIONS_BY_USERS, payload: response.data });
            })
            .catch(err => { });
    };
}