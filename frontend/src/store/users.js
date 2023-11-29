import jwtFetch from "./jwt";

export const RECEIVE_USER = "users/RECEIVE_USER";
export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_EVENT_JOIN = "users/RECEIVE_EVENT_JOIN";

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const receiveEventJoin = (eventJoin) => ({
  type: RECEIVE_EVENT_JOIN,
  eventJoin
})

export const addEventJoin = (userId, eventId) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}/events/${eventId}`, {
    method: "POST"
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveEventJoin(data));
  }
}

export const removeEventJoin = (userId, eventId) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}/events/${eventId}`, {method: "DELETE"})
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveEventJoin(data));
  }
}

export const fetchUser = (userId) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${userId}`);
    if (res.ok) {
        const user = await res.json();
        dispatch(receiveUser(user));
    }
}

export const fetchUsers = () => async (dispatch) => {
  const res = await jwtFetch(`/api/users`);

  if (res.ok) {
    const users = await res.json();
    dispatch(receiveUsers(users));
  }
}

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USER:
          return { ...state, [action.user._id]: action.user };
        case RECEIVE_USERS:
          return {...action.users};
        case RECEIVE_EVENT_JOIN:
            return {...state, [action.eventJoin.user._id]: action.eventJoin.user}
        default: 
          return state;
    }
}
export default usersReducer;