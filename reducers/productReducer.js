import {
    GET_PRODUCT, GET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT,
    GET_PRODUCTS_BY_ORDER, GET_PRODUCTS_BY_TASK
} from '../config/actionNames';
const initialState = {
    products: [],
    orderProducts: [],
    taskProducts: [],
    product: {}
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case ADD_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case GET_PRODUCTS_BY_ORDER:
            return {
                ...state,
                orderProducts: action.payload
            }
        case GET_PRODUCTS_BY_TASK:
            return {
                ...state,
                taskProducts: action.payload
            }
        default:
            return state;
    }
};
export default reducer;