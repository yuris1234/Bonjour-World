import jwtFetch from './jwt';
import { closeModal } from './modal';

const RECEIVE_CURRENT_USER = 'session/RECEIVE_CURRENT_USER';
const RECEIVE_SESSION_ERRORS = 'session/RECEIVE_SESSION_ERRORS';
const CLEAR_SESSION_ERRORS = 'session/CLEAR_SESSION_ERRORS';
export const RECEIVE_USER_LOGOUT = 'session/RECEIVE_USER_LOGOUT';

// Dispatch receiveCurrentUser when a user logs in.
export const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser,
});

// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT,
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS,
});

export const signup = (user, history) => startSession(user, 'api/users/register', history);
export const login = (user, history) => startSession(user, 'api/users/login', history);

export const logout = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
};

const startSession = (userInfo, route, history) => async (dispatch) => {
    try {
        const res = await jwtFetch(route, {
            method: 'POST',
            body: JSON.stringify(userInfo),
        });
        const { user, token } = await res.json();
        localStorage.setItem('jwtToken', token);
        dispatch(receiveCurrentUser(user));
        dispatch(closeModal());
        history.push('/events');
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            dispatch(receiveErrors(res.errors));
            return res;
        }
    }
};

export const getCurrentUser = () => async (dispatch) => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
};

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case CLEAR_SESSION_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const initialState = {
    user: undefined,
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { user: action.currentUser };
        case RECEIVE_USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default sessionReducer;
