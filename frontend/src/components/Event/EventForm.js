import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./EventForm.css";
import {
  getEvent,
  fetchEvent,
  createEvent,
  updateEvent,
  clearEventErrors,
} from "../../store/events";

const EventForm = () => {
  const errors = useSelector((state) => state.errors.event);

  const { eventId } = useParams();
  const eventType = eventId ? "Update Event" : "Create Event";
  let event = useSelector(getEvent(eventId));
  if (eventType === "Create Event")
    event = {
      title: "",
      description: "",
      language: "",
      state: "",
      city: "",
      address: "",
      zipcode: "",
      lat: "",
      long: "",
      date: "",
      time: "",
      host: "",
    };

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [language, setLanguage] = useState(event.language);
  const [state, setState] = useState(event.state);
  const [city, setCity] = useState(event.city);
  const [address, setAddress] = useState(event.address);
  const [zipcode, setZipcode] = useState(event.zipcode);
  const [lat, setLat] = useState(event.lat);
  const [long, setLong] = useState(event.long);
  const [date, setDate] = useState(
    event.date ? new Date(event.date) : new Date()
  );
  const [time, setTime] = useState(event.time);
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEvent(eventId));
    }
  }, [dispatch, eventId]);

  useEffect(() => {
    return () => dispatch(clearEventErrors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formatDate(date);

    const updatedEvent = {
      title,
      description,
      language,
      state,
      city,
      address,
      zipcode,
      lat,
      long,
      date: formattedDate,
      time,
    };
    debugger

    eventType === "Create Event"
      ? dispatch(createEvent(updatedEvent))
      : dispatch(updateEvent(updatedEvent));
  };

  const update = (field) => {
    return (e) => {
      switch (field) {
        case "title":
          setTitle(e.currentTarget.value);
          break;
        case "description":
          setDescription(e.currentTarget.value);
          break;
        case "language":
          setLanguage(e.currentTarget.value);
          break;
        case "state":
          setState(e.currentTarget.value);
          break;
        case "city":
          setCity(e.currentTarget.value);
          break;
        case "address":
          setAddress(e.currentTarget.value);
          break;
        case "zipcode":
          setZipcode(e.currentTarget.value);
          break;
        case "lat":
          setLat(e.currentTarget.value);
          break;
        case "long":
          setLong(e.currentTarget.value);
          break;
        case "date":
          setDate(new Date(e.target.value));
          break;
        case "time":
          setTime(e.currentTarget.value);
          break;
        default:
          console.error("Field name error");
          break;
      }
    };
  };

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateTimeOptions = () => {
    const timeOptions = [];
    const interval = 15;

    for (let hour = 7; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const formattedTime = `${formattedHour}:${formattedMinute}`;
        timeOptions.push(
          <option key={formattedTime} value={formattedTime}>
            {formattedTime}
          </option>
        );
      }
    }

    return timeOptions;
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{eventType}</h2>

      <div className="inputs">
        <div className="left-column">
          <div className="errors">{errors?.title}</div>
          <div className="column">
            <label>
              Title
              <input type="text" value={title} onChange={update("title")} />
            </label>

            <div className="errors">{errors?.description}</div>
            <label>
              Description
              <textarea value={description} onChange={update("description")} />
            </label>

            <div className="errors">{errors?.language}</div>
            <label>
              Language
              <input
                type="text"
                value={language}
                onChange={update("language")}
              />
            </label>

            <label>
              State
              <select value={state} onChange={update("state")}>
                <option value="">Select State</option>
                {states.map((stateOption) => (
                  <option key={stateOption} value={stateOption}>
                    {stateOption}
                  </option>
                ))}
              </select>
            </label>

            <div className="errors">{errors?.city}</div>
            <label>
              City
              <input type="text" value={city} onChange={update("city")} />
            </label>

            <div className="errors">{errors?.address}</div>
            <label>
              Address
              <input type="text" value={address} onChange={update("address")} />
            </label>
          </div>
        </div>

        <div className="right-column">
          <div className="errors">{errors?.zipcode}</div>
          <label>
            Zipcode
            <input type="text" value={zipcode} onChange={update("zipcode")} />
          </label>

          <div className="errors">{errors?.lat}</div>
          <label>
            Lat
            <input type="text" value={lat} onChange={update("lat")} />
          </label>

          <div className="errors">{errors?.long}</div>
          <label>
            Long
            <input type="text" value={long} onChange={update("long")} />
          </label>

          <div className="errors">{errors?.date}</div>
          <label>
            Date
            <input
              type="date"
              value={formatDate(date)}
              onChange={(e) => {
                setDate(new Date(e.target.value));
                update("date");
              }}
            />
          </label>

          <div className="errors">{errors?.time}</div>
          <label>
            Time
            <select value={time} onChange={update("time")}>
              <option value="">Select Time</option>
              {generateTimeOptions()}
            </select>
          </label>
        </div>
      </div>

      <input type="submit" value={eventType} />
    </form>
  );
};

export default EventForm;
