import { useDispatch } from "react-redux"

export default function ({event, user}) {
    const dispatch = useDispatch();

    const handleAccept = (e) => {

    }

    const handleDelete = (e) => {

    }

    return (
        <li>
            {event.pendingAttendees.map((req) => {
                <>
                    <button onClick={handleAccept}>Accept</button>
                    <button onClick={handleDelete}>Deny</button>
                </>
            })}
        </li>
    )
}