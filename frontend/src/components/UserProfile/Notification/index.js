import { useDispatch, useSelector } from "react-redux";
import { createJoinRequest } from "../../../store/events";
import { deleteJoinRequest } from "../../../store/events";
import { addEventJoin, fetchUser, getUser, receiveUser } from "../../../store/users";
import "./index.css";

export default function ({ event }) {
  const dispatch = useDispatch();

  const handleAccept = (e) => {
    // deleting join request, adding user to event
    dispatch(addEventJoin(e.target.value, event._id));
    dispatch(deleteJoinRequest(event._id, e.target.value));
  };

  const handleDelete = (e) => {
    // deleting join request
    dispatch(deleteJoinRequest(event._id, e.target.value));
  };

  return (
    <li>
      {event.pendingAttendees.map((pendingUser) => {
        const user = useSelector(getUser(pendingUser))

        return (
            <div className="pending-btns">
                <h1>{user?.username}</h1>
                <button
                value={pendingUser}
                onClick={handleAccept}
                className="handle-accept"
                >
                Accept
                </button>
                <button
                value={pendingUser}
                onClick={handleDelete}
                className="handle-delete"
                >
                Deny
                </button>
            </div>
        );
      })}
    </li>
  );
}
