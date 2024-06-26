import { GET_USER, GET_USERS, DELETE_USER, UPDATE_USER, ADD_USER, GET_USERS_BY_PAGE } from '../config/actionNames';
const initialState = {
    users: [],
    user: {},
    pageUsers: {content: [], totalElements: 0}
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_USER:
            return {
                ...state
            }
        case ADD_USER:
            return {
                ...state
            }
        case DELETE_USER:
            return {
                ...state
            }
        case GET_USERS_BY_PAGE:
            return {
                ...state,
                pageUsers: action.payload
            }
        default:
            return state;
    }
};
export default reducer;