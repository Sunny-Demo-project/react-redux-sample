import { SET_LOADER, RESET_LOADER, SET_BREADCRUMBS, RESET_BREADCRUMBS } from '../config/actionNames';
import manage from '../config/breadcrumbsManager';
const initialState = {
    showLoader: false,
    breadcrumbs: manage() || []
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state,
                showLoader: true
            }
        case RESET_LOADER:
            return {
                ...state,
                showLoader: false
            };
        case SET_BREADCRUMBS:
            return {
                ...state,
                breadcrumbs: action.breadcrumbs
            };
        case RESET_BREADCRUMBS:
            return {
                ...state,
                breadcrumbs: action.breadcrumbs
            };
        default:
            return state;
    }
};
export default reducer;