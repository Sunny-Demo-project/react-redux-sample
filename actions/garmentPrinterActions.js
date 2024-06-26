import axios from 'axios';
import { api } from '../config/env';
import { GET_GARMENT_PRINTER, GET_GARMENT_PRINTERS, UPDATE_GARMENT_PRINTER, 
    ADD_GARMENT_PRINTER, DELETE_GARMENT_PRINTER, GET_GARMENT_PRINTERS_BY_ACTIVE } from '../config/actionNames';
const PATH = 'garmentPrinters/';
export function getGarmentPrinters() {
    return dispatch => {
        axios
            .get(`${api}${PATH}`)
            .then(response => {
                dispatch({ type: GET_GARMENT_PRINTERS, payload: response.data });
            })
            .catch(err => { });
    };
}
export function getGarmentPrinter(id) {
    return dispatch => {
        axios
            .get(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: GET_GARMENT_PRINTER, payload: response.data });
            })
            .catch(err => { });
    };
}

export function deleteGarmentPrinter(id) {
    return dispatch => {
        axios
            .delete(`${api}${PATH}${id}`)
            .then(response => {
                dispatch({ type: DELETE_GARMENT_PRINTER, payload: response.data });
                dispatch(getGarmentPrintersByActive());
            })
            .catch(err => { });
    };
}

export function updateGarmentPrinter(id, payload) {
    return dispatch => {
        axios
            .put(`${api}${PATH}${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_GARMENT_PRINTER, payload: response.data });
            })
            .catch(err => { });
    };
}
export function addGarmentPrinter(payload) {
    return dispatch => {
        axios
            .post(`${api}${PATH}`, payload)
            .then(response => {
                dispatch({ type: ADD_GARMENT_PRINTER, payload: response.data });
                dispatch(getGarmentPrintersByActive ());
            })
            .catch(err => {});
    };
}

export function getGarmentPrintersByActive(params) {
    return dispatch => {
        axios
            .get(`${api}${PATH}byActive`, {params})
            .then(response => {
                dispatch({ type: GET_GARMENT_PRINTERS_BY_ACTIVE, payload: response.data });
            })
            .catch(err => { });
    };
}
