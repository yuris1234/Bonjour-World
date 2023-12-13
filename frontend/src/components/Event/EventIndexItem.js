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

  const formatDate = (originalDate) => {
    const dateObject = new Date(originalDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${month}-${day}-${year}`;
  };

  const getStateAbbreviation = (stateFullName) => {
    const stateMap = {
      Alabama: "AL",
      Alaska: "AK",
      Arizona: "AZ",
      Arkansas: "AR",
      California: "CA",
      Colorado: "CO",
      Connecticut: "CT",
      Delaware: "DE",
      Florida: "FL",
      Georgia: "GA",
      Hawaii: "HI",
      Idaho: "ID",
      Illinois: "IL",
      Indiana: "IN",
      Iowa: "IA",
      Kansas: "KS",
      Kentucky: "KY",
      Louisiana: "LA",
      Maine: "ME",
      Maryland: "MD",
      Massachusetts: "MA",
      Michigan: "MI",
      Minnesota: "MN",
      Mississippi: "MS",
      Missouri: "MO",
      Montana: "MT",
      Nebraska: "NE",
      Nevada: "NV",
      "New Hampshire": "NH",
      "New Jersey": "NJ",
      "New Mexico": "NM",
      "New York": "NY",
      "North Carolina": "NC",
      "North Dakota": "ND",
      Ohio: "OH",
      Oklahoma: "OK",
      Oregon: "OR",
      Pennsylvania: "PA",
      "Rhode Island": "RI",
      "South Carolina": "SC",
      "South Dakota": "SD",
      Tennessee: "TN",
      Texas: "TX",
      Utah: "UT",
      Vermont: "VT",
      Virginia: "VA",
      Washington: "WA",
      "West Virginia": "WV",
      Wisconsin: "WI",
      Wyoming: "WY",
    };

    return stateMap[stateFullName] || stateFullName;
  };

  return (
    <div
      id="event-item"
      onClick={redirectShow}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div id="event-item-title">{event.title}</div>
      <div id="event-item-language">{event.language}</div>
      <div id="event-item-bottom">
        <div id="date-item-and-time">
          <div id="event-item-date">{formatDate(event.date)}</div>
          <div id="event-item-time">{event.time}</div>
        </div>
        <div id="item-location-div">
          <div id="event-item-city">{event.city}</div>
          <div id="event-item-state">{getStateAbbreviation(event.state)}</div>
          <div id="event-item-zipcode">{event.zipcode}</div>
        </div>
      </div>

      {/* <div id="event-item-time">{host}</div> */}
    </div>
  );
};

export default EventIndexItem;
