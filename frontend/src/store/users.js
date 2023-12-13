import jwtFetch from "./jwt";
import { RECEIVE_JOIN_REQUEST } from "./events";
import { RECEIVE_EVENT } from "./events";

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

export const getAttendees = (event) => (state) => {
  const holder = [];
  if (event) {
    Object.values(state.users).filter((user) => {
      if (event.attendees.includes(user._id)) {
        holder.push(user)
      }
    }) 
    return holder
  }
}

export const getHost = (event) => (state) => {
  if (event?.host) {
    return state.users[event.host]
  }
}

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
  const newState = {}
    switch (action.type) {
        case RECEIVE_USER:
          return { ...state, [action.user._id]: action.user };
        case RECEIVE_USERS:
          Object.values(action.users).forEach((user) => {
            newState[user._id] = user;
          })
          return {...state, ...newState};
        case RECEIVE_EVENT_JOIN:
          return {...state, [action.eventJoin.user._id]: action.eventJoin.user}
        case RECEIVE_JOIN_REQUEST:
          return {...state, [action.joinRequest.user._id]: action.joinRequest.user}
        case RECEIVE_EVENT:
          Object.values(action.event.attendees).forEach((user) => {
            newState[user._id] = user;
          })
          return {...state, ...newState}
        default: 
          return state;
    }
}
export default usersReducer;