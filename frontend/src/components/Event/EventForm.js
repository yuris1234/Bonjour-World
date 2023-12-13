import React, { useState, useEffect } from "react";
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
import { closeModal } from "../../store/modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const EventForm = () => {
  const history = useHistory();
  const errors = useSelector((state) => state.errors.event);
  const currentUser = useSelector((state) => state.session.user);

  const { eventId } = useParams();
  const eventType = eventId ? "Update Event" : "Create Event";
  let event = useSelector(getEvent(eventId));
  if (eventType === "Create Event")
    event = {
      title: "",
      description: "",
      languages: "",
      state: "",
      city: "",
      address: "",
      zipcode: "",
      date: "",
      time: "",
      host: "",
    };

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [languages, setLanguages] = useState(event.languages);
  const [state, setState] = useState(event.state);
  const [city, setCity] = useState(event.city);
  const [address, setAddress] = useState(event.address);
  const [zipcode, setZipcode] = useState(event.zipcode);
  const [date, setDate] = useState(
    event.date ? new Date(event.date) : new Date()
  );
  const [time, setTime] = useState(event.time);
  const dispatch = useDispatch();
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const apiKey = process.env.REACT_APP_MAPS_API_KEY;

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEvent(eventId));
    }
  }, [dispatch, eventId]);

  useEffect(() => {
    return () => dispatch(clearEventErrors());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      title,
      description,
      languages,
      state,
      city,
      address,
      zipcode,
      date,
      time,
      host: currentUser._id,
      attendees: [currentUser._id],
    };

    const res = await dispatch(createEvent(updatedEvent));
    if (res?.title) {
      dispatch(closeModal());
      history.push(`/events/${res._id}`);
    }
  };

  const handleAddressChange = (address) => {
    setAddressSuggestions([]);
    setSelectedAddress(address);
  };

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      console.log("Coordinates:", latLng);
      console.log("Formatted Address:", address);

      setSelectedAddress(address);

      const streetAddress = results[0]?.formatted_address.split(",")[0].trim();
      setAddress(streetAddress);
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}`
    );
    const data = await response.json();
    return data.result;
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
        case "languages":
          setLanguages(e.currentTarget.value);
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

  const allLanguages = ["German", "Spanish", "English", "French"];

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

  // const formatDate = (e) => {
  //   const updatedDate = date.toISOString().substring(0, 10),
  //   field = document.querySelector('#date');
  //   setDate(updatedDate);
  //   field.value = updatedDate;
  // }

  const handleCheckbox = (e) => {
    if (e.target.checked && !languages.includes(e.target.value)) {
      setLanguages(prev => [...prev, e.target.value])
    } else if (!e.target.checked && languages.includes(e.target.value)) {
      setLanguages(prev => prev.pull(e.target.value))
    }
    console.log(languages);
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{eventType}</h2>

      <div className="selects">
        <div className="select">
          <div className="errors">{errors?.time}</div>
          <div className="event-select-btn">
            <select value={time} onChange={update("time")}>
              <option disabled value="">
                Select Time
              </option>
              {generateTimeOptions()}
            </select>
          </div>
        </div>

        <div className="select">
          <div className="errors">{errors?.language}</div>
          <div className="event-select-btn">
            {/* <select value={languages} onChange={update("languages")} multiple>
              <option disabled value="">
                Select Languages
              </option> */}
              {allLanguages.map((lang) => (
                <input type="checkbox" onChange={handleCheckbox} key={lang} value={lang}/>
              ))}
            {/* </select> */}
          </div>
        </div>

        <div className="select">
          <div className="errors">{errors?.state}</div>
          <div className="event-select-btn">
            <select value={state} onChange={update("state")}>
              <option disabled value="">
                Select State
              </option>
              {states.map((stateOption) => (
                <option key={stateOption} value={stateOption}>
                  {stateOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="inputs">
        <div className="left-column">
          <div className="errors">{errors?.title}</div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={update("title")}
          />

          <div className="errors">{errors?.date}</div>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

          <PlacesAutocomplete
            value={selectedAddress}
            onChange={handleAddressChange}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Type your address",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion, index) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };

                    // Extract street name from structured_formatting or use description
                    const streetName =
                      suggestion.structured_formatting?.name ||
                      suggestion.description;

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          style,
                        })}
                        key={index}
                      >
                        <strong>{streetName}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

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

      <input type="submit" value={eventType} />
    </form>
  );
};

export default EventForm;
