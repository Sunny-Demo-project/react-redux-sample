import {
    GET_BIN, GET_BINS, DELETE_BIN, UPDATE_BIN, ADD_BIN, CREATE_BIN,
    GET_BIN_TYPES, GET_BINS_BY_ACTIVE
} from '../config/actionNames';
const initialState = {
    bins: [],
    activeBins: {content: [], totalElements: 0},
    bin: {},
    binTypes: [],
    createdBin: {}
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BINS:
            return {
                ...state,
                bins: action.payload
            }
        case GET_BIN:
            return {
                ...state,
                bin: action.payload
            };
        case UPDATE_BIN:
            return {
                ...state
            }
        case ADD_BIN:
            return {
                ...state
            }
        case DELETE_BIN:
            return {
                ...state
            }
        case CREATE_BIN:
            return {
                ...state,
                createdBin: action.payload
            }
        case GET_BIN_TYPES:
            return {
                ...state,
                binTypes: action.payload
            }
        case GET_BINS_BY_ACTIVE:
            return {
                ...state,
                activeBins: action.payload
            }
        default:
            return state;
    }
};
export default reducer;