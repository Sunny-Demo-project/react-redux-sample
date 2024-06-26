import { SET_BREADCRUMBS, RESET_BREADCRUMBS } from '../config/actionNames';

export function setBreadcrumbs(breadcrumbs) {
    return dispatch => {
        dispatch({ type: SET_BREADCRUMBS, breadcrumbs });
    };
}
export function resetBreadcrumbs(breadcrumbs) {
    return dispatch => {
        dispatch({ type: RESET_BREADCRUMBS, breadcrumbs });
    };
}