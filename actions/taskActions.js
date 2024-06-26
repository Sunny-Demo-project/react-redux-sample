import axios from 'axios';
import { api } from '../config/env';
import { GET_TASK, GET_TASKS, UPDATE_TASK, ADD_TASK, DELETE_TASK, 
    CURRENT_TASK_BY_USER, GET_TASKS_BY_STATUS } from '../config/actionNames';
const PATH = 'tasks/';
export function getTasks() {
    return dispatch => {
        axios
            .get(`${api}${PATH}`)
            .then(response => {
                dispatch({ type: GET_TASKS, payload: response.data });
            })
            .catch(err => { });
    };
}
export function getTask(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: GET_TASK, payload: response.data });
            })
            .catch(err => { });
    };
}

export function deleteTask(id) {
    return dispatch => {
        axios
            .delete(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: DELETE_TASK, payload: response.data });
            })
            .catch(err => { });
    };
}

export function updateTask(id, payload) {
    return dispatch => {
        axios
            .put(`${api}${PATH}${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_TASK, payload: response.data });
            })
            .catch(err => { });
    };
}
export function addTask(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}`, payload)
            .then(response => {
                dispatch({ type: ADD_TASK, payload: response.data });
            })
            .catch(err => {});
    };
}

export function getCurrentTaskByUsers(userNames) {
    return dispatch => {
        axios
            .post(`${api}${PATH}assigned`, userNames)
            .then(response => {
                dispatch({ type: CURRENT_TASK_BY_USER, payload: response.data });
            })
            .catch(err => { });
    };
}

export function getTasksByStatus(params) {
    return dispatch => {
        axios
            .get(`${api}${PATH}byStatus`, {params})
            .then(response => {
                dispatch({ type: GET_TASKS_BY_STATUS, payload: response.data });
            })
            .catch(err => { });
    };
}