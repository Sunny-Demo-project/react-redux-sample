import axios from 'axios';
import { api } from '../config/env';
import { GET_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT, ADD_PRODUCT, DELETE_PRODUCT, 
    GET_PRODUCTS_BY_ORDER, GET_PRODUCTS_BY_TASK } from '../config/actionNames';
const PATH = 'products/';
export function getProducts() {
    return dispatch => {
        axios
            .get(`${api}${PATH}`)
            .then(response => {
                dispatch({ type: GET_PRODUCTS, payload: response.data });
            })
            .catch(err => { });
    };
}
export function getProduct(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: GET_PRODUCT, payload: response.data });
            })
            .catch(err => { });
    };
}

export function deleteProduct(id) {
    return dispatch => {
        axios
            .delete(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: DELETE_PRODUCT, payload: response.data });
            })
            .catch(err => { });
    };
}

export function updateProduct(id, payload) {
    return dispatch => {
        axios
            .put(`${api}${PATH}${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_PRODUCT, payload: response.data });
            })
            .catch(err => { });
    };
}
export function addProduct(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}`, payload)
            .then(response => {
                dispatch({ type: ADD_PRODUCT, payload: response.data });
            })
            .catch(err => {});
    };
}
export function getProductsByOrder(orderId) {
    return dispatch => {
        axios
            .get(`${api}${PATH}byOrder/${orderId}`)
            .then(response => {
                dispatch({ type: GET_PRODUCTS_BY_ORDER, payload: response.data });
            })
            .catch(err => { });
    };
}
export function getProductsByTask(taskId) {
    return dispatch => {
        axios
            .get(`${api}${PATH}byTask/${taskId}`)
            .then(response => {
                dispatch({ type: GET_PRODUCTS_BY_TASK, payload: response.data });
            })
            .catch(err => { });
    };
}