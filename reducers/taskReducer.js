import { GET_TASK, GET_TASKS, DELETE_TASK, UPDATE_TASK, ADD_TASK, CURRENT_TASK_BY_USER, GET_TASKS_BY_STATUS } from '../config/actionNames';
const initialState = {
    tasks: [],
    statusTasks: {content: [], totalElements: 0},
    task: {},
    userCurrentTasks: {}
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        case GET_TASK:
            return {
                ...state,
                task: action.payload
            };
        case UPDATE_TASK:
            return {
                ...state
            }
        case ADD_TASK:
            return {
                ...state
            }
        case DELETE_TASK:
            return {
                ...state
            }
        case CURRENT_TASK_BY_USER:
            return {
                ...state,
                userCurrentTasks: action.payload
            }
        case GET_TASKS_BY_STATUS:
            return {
                ...state,
                statusTasks: action.payload
            }
        default:
            return state;
    }
};
export default reducer;