import {
    GET_GARMENT_PRINTER, GET_GARMENT_PRINTERS, DELETE_GARMENT_PRINTER, UPDATE_GARMENT_PRINTER,
    ADD_GARMENT_PRINTER, GET_GARMENT_PRINTERS_BY_ACTIVE
} from '../config/actionNames';
const initialState = {
    garmentPrinters: [],
    activeGarmentPrinters: {content: [], totalElements: 0},
    garmentPrinter: {}
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_GARMENT_PRINTERS:
            return {
                ...state,
                garmentPrinters: action.payload
            }
        case GET_GARMENT_PRINTER:
            return {
                ...state,
                garmentPrinter: action.payload
            };
        case UPDATE_GARMENT_PRINTER:
            return {
                ...state
            }
        case ADD_GARMENT_PRINTER:
            return {
                ...state
            }
        case DELETE_GARMENT_PRINTER:
            return {
                ...state
            }
        case GET_GARMENT_PRINTERS_BY_ACTIVE:
            return {
                ...state,
                activeGarmentPrinters: action.payload
            }
        default:
            return state;
    }
};
export default reducer;