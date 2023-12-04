import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./EventForm.css";
import {
  getEvent,
  fetchEvent,
  updateEvent,
  clearEventErrors,
} from "../../store/events";
import { closeModal } from "../../store/modal";
import "./EventForm.css";

const EventUpdateForm = ({ eventId }) => {
  const errors = useSelector((state) => state.errors.event);
  const history = useHistory();
  let event = useSelector(getEvent(eventId));

  const [title, setTitle] = useState(event?.title);
  const [description, setDescription] = useState(event?.description);
  const [language, setLanguage] = useState(event?.language);
  const [state, setState] = useState(event?.state);
  const [city, setCity] = useState(event?.city);
  const [address, setAddress] = useState(event?.address);
  const [zipcode, setZipcode] = useState(event?.zipcode);
  const [date, setDate] = useState(event?.date);
  const [time, setTime] = useState(event?.time);

  const dispatch = useDispatch();

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEvent(eventId));
    }
    if (event) {
      const newDate = formatDate(new Date(date));
      setDate(newDate);
    }
  }, [eventId]);

  useEffect(() => {
    return () => dispatch(clearEventErrors());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger

    const updatedEvent = {
      ...event,
      title,
      description,
      language,
      state,
      city,
      address,
      zipcode,
      date,
      time,
    };
    const res = await dispatch(updateEvent(updatedEvent));
    if (res.ok) {
      dispatch(closeModal());
      history.push(`/events/${eventId}`);
    }
  };

  const formatDate = (inputDate) => {
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(inputDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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

  const languages = ["German", "Spanish", "English", "French"];

  // const formatDate = (e) => {
  //   const updatedDate = date.toISOString().substring(0, 10),
  //   field = document.querySelector('#date');
  //   field.value = updatedDate;
  // }

  const generateTimeOptions = () => {
    const timeOptions = [];
    const interval = 15;

    for (let hour = 7; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const formattedTime = `${formattedHour}:${formattedMinute}`;
        timeOptions.push(
          time === formattedTime ? (
            <option key={formattedTime} value={formattedTime} selected>
              {formattedTime}
            </option>
          ) : (
            <option key={formattedTime} value={formattedTime}>
              {formattedTime}
            </option>
          )
        );
      }
    }

    return timeOptions;
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Edit Event</h2>

      <div className="selects">
        <div className="select">
          <div className="errors">{errors?.time}</div>
          <select value={time} onChange={update("time")}>
            <option disabled value="">
              Select Time
            </option>
            {generateTimeOptions()}
          </select>
        </div>

        <div className="select">
          <div className="errors">{errors?.language}</div>
          <select value={language} onChange={update("language")}>
            <option disabled value="">
              Select Language
            </option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="select">
          <div className="errors">{errors?.state}</div>
          <select value={state} onChange={update("state")}>
            <option disabled value="">Select State</option>
            {states.map((stateOption) => (
              <option key={stateOption} value={stateOption}>
                {stateOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="inputs">
        <div className="left-column">
          <div className="errors">{errors?.title}</div>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={update("title")}
          />

          <div className="errors">{errors?.date}</div>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>

        <div className="right-column">
          <div className="errors">{errors?.city}</div>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={update("city")}
          />

          <div className="errors">{errors?.address}</div>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={update("address")}
          />

          <div className="errors">{errors?.zipcode}</div>
          <input
            type="text"
            placeholder="Zipcode"
            value={zipcode}
            onChange={update("zipcode")}
          />
        </div>
      </div>

      <div className="errors">{errors?.description}</div>
      <textarea
        placeholder="Description"
        value={description}
        onChange={update("description")}
      />

      <input type="submit" value="Update Event" />
    </form>
  );
};

export default EventUpdateForm;
