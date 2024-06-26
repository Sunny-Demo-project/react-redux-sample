import axios from 'axios';
import { api } from '../config/env';
import { GET_ORDER, GET_ORDERS, UPDATE_ORDER, ADD_ORDER, DELETE_ORDER, GET_ORDERS_BY_STATUS } from '../config/actionNames';
const PATH = 'orders/';
export function getOrders() {
    return dispatch => {
        axios
            .get(`${api}${PATH}`)
            .then(response => {
                dispatch({ type: GET_ORDERS, payload: response.data });
            })
            .catch(err => { });
    };
}
export function getOrder(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: GET_ORDER, payload: response.data });
            })
            .catch(err => { });
    };
}

export function deleteOrder(id) {
    return dispatch => {
        axios
            .delete(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: DELETE_ORDER, payload: response.data });
                dispatch(getOrdersByStatus());
            })
            .catch(err => { });
    };
}

export function updateOrder(id, payload) {
    return dispatch => {
        axios
            .put(`${api}${PATH}${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_ORDER, payload: response.data });
            })
            .catch(err => { });
    };
}
export function addOrder(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}`, payload)
            .then(response => {
                dispatch({ type: ADD_ORDER, payload: response.data });
                dispatch(getOrdersByStatus());
            })
            .catch(err => {});
    };
}

export function getOrdersByStatus(params) {
    return dispatch => {
        axios
            .get(`${api}${PATH}byStatus`, {params})
            .then(response => {
                dispatch({ type: GET_ORDERS_BY_STATUS, payload: response.data });
            })
            .catch(err => { });
    };
}