import React from "react";
import "./EventIndexItem.css";
import { useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { getUser } from '../../store/users';

const EventIndexItem = ({ event, setHighlightedEvent }) => {
  const history = useHistory();
  // const host = useSelector(getUser(event.host))

  const redirectShow = () => {
    history.push(`/events/${event._id}`);
  };

  const handleMouseOver = () => {
    setHighlightedEvent(event);
  };

  const handleMouseOut = () => {
    setHighlightedEvent(null);
  };

  return (
    <>
      <div
        id="event-item"
        onClick={redirectShow}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div id="event-item-title">{event.title}</div>
        <div id="event-item-language">{event.language}</div>
        <div id="date-item-and-time">
          <div id="event-item-date">{event.date}</div>
          <div id="event-item-time">{event.time}</div>
        </div>
        {/* <div id="event-item-time">{host}</div> */}
        {/* <br /> */}
        {/* <div className="event-item-description">{event.description}</div> */}
        {/* <br /> */}
        {/* <div className="event-item-location">{event.city}</div> */}
      </div>
    </>
  );
};

export default EventIndexItem;
