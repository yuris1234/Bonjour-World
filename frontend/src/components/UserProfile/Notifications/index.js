// import { useDispatch, useSelector } from "react-redux";
// import { createJoinRequest, fetchEvent } from "../../../store/events";
// import { deleteJoinRequest } from "../../../store/events";
// import { addEventJoin, fetchUser, getPendingAttendees, getUser, receiveUser } from "../../../store/users";
// import "./index.css";
// import { useEffect } from "react";

// export default function ({ event }) {
//   const dispatch = useDispatch();

//   const handleAccept = async (e) => {
//     // deleting join request, adding user to event
//     await dispatch(addEventJoin(e.target.value, event._id));
//     await dispatch(deleteJoinRequest(event._id, e.target.value));
//   };
  
//   const handleDelete = (e) => {
//     // deleting join request
//     dispatch(deleteJoinRequest(event._id, e.target.value));
//   };

//   const users = useSelector(getPendingAttendees(event));

//   useEffect(() => {
//     dispatch(fetchEvent(event?._id))
//   }, [dispatch])

//   return (
//     <>
//       {users.map((user) => {

//         return (
//           <div className="notifications-container">
//             <div className="title-user">
//               <div className="event-title">{event.title}</div>
//               <div className="pending-user">{user?.username}</div>
//             </div>
//             <div className="btns-container">
//               <button
//                 value={user?._id}
//                 onClick={handleAccept}
//                 className="handle-accept"
//               >
//                 Accept
//               </button>
//               <button
//                 value={user?._id}
//                 onClick={handleDelete}
//                 className="handle-delete"
//               >
//                 Deny
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// }
