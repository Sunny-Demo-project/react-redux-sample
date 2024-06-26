import { GET_ORDER, GET_ORDERS, DELETE_ORDER, UPDATE_ORDER, ADD_ORDER, GET_ORDERS_BY_STATUS } from '../config/actionNames';
const initialState = {
    orders: [],
    statusOrders: {content: [], totalElements: 0},
    order: {}
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case GET_ORDER:
            return {
                ...state,
                order: action.payload
            };
        case UPDATE_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case ADD_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case DELETE_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case GET_ORDERS_BY_STATUS:
            return {
                ...state,
                statusOrders: action.payload
            }
        default:
            return state;
    }
};
export default reducer;