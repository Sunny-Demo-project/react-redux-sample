import {
    GET_TOTE, GET_TOTES, DELETE_TOTE, UPDATE_TOTE, ADD_TOTE, CREATE_TOTE,
    GET_TOTE_TYPES, GET_TOTES_BY_ACTIVE
} from '../config/actionNames';
const initialState = {
    totes: [],
    activeTotes: {content: [], totalElements: 0},
    tote: {},
    toteTypes: [],
    createdTote: {}
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOTES:
            return {
                ...state,
                totes: action.payload
            }
        case GET_TOTE:
            return {
                ...state,
                tote: action.payload
            };
        case UPDATE_TOTE:
            return {
                ...state
            }
        case ADD_TOTE:
            return {
                ...state
            }
        case DELETE_TOTE:
            return {
                ...state
            }
        case CREATE_TOTE:
            return {
                ...state,
                createdTote: action.payload
            }
        case GET_TOTE_TYPES:
            return {
                ...state,
                toteTypes: action.payload
            }
        case GET_TOTES_BY_ACTIVE:
            return {
                ...state,
                activeTotes: action.payload
            }
        default:
            return state;
    }
};
export default reducer;