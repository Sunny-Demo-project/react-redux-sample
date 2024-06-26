import {
    GET_ACTION, GET_ACTIONS, ADD_ACTION, UPDATE_ACTION, DELETE_ACTION,
    GET_ACTIONS_BY_ORDER, GET_ACTIONS_BY_PRODUCT, GET_ACTIONS_BY_USER, GET_LAST_ACTIONS_BY_USERS
} from '../config/actionNames';
const initialState = {
    actions: [],
    orderActions: [],
    productActions: [],
    action: {},
    userActions: [],
    usersLastAction: {}
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ACTIONS:
            return {
                ...state,
                actions: action.payload
            }
        case GET_ACTION:
            return {
                ...state,
                action: action.payload
            };
        case UPDATE_ACTION:
            return {
                ...state,
                action: action.payload
            }
        case ADD_ACTION:
            return {
                ...state,
                action: action.payload
            }
        case DELETE_ACTION:
            return {
                ...state,
                action: action.payload
            }
        case GET_ACTIONS_BY_ORDER:
            return {
                ...state,
                orderActions: action.payload
            }
        case GET_ACTIONS_BY_PRODUCT:
            return {
                ...state,
                productActions: action.payload
            }
        case GET_LAST_ACTIONS_BY_USERS:
            return {
                ...state,
                usersLastAction: action.payload
            }
        case GET_ACTIONS_BY_USER:
            return {
                ...state,
                userActions: action.payload
            }
        default:
            return state;
    }
};
export default reducer;