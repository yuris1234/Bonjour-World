import { useDispatch } from "react-redux"
import { createJoinRequest } from "../../../store/events";
import { deleteJoinRequest } from "../../../store/events";

export default function ({event}) {
    const dispatch = useDispatch();

    const handleAccept = (e) => {
        dispatch(createJoinRequest(event._id, e.target.value.user._id))
    }

    const handleDelete = (e) => {
        dispatch(deleteJoinRequest(event._id, e.target.value._id))
    }

    return (
        <li>
            {event.pendingAttendees.map((user) => {
                return (<>
                    <button value={user} onClick={handleAccept}>Accept</button>
                    <button value={user} onClick={handleDelete}>Deny</button>
                </>)
            })}
        </li>
    )
}