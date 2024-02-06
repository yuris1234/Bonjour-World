import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EventForm.css";
import { createEvent, clearEventErrors } from "../../store/events";
import { closeModal } from "../../store/modal";
import { useHistory } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const EventForm = () => {
  const dispatch = useDispatch();

  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const history = useHistory();
  const errors = useSelector((state) => state.errors.event);
  const currentUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [languages, setLanguages] = useState([]);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const apiKey = process.env.REACT_APP_MAPS_API_KEY;

  useEffect(() => {
    return () => dispatch(clearEventErrors());
  }, [dispatch]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", () => {
        setGoogleMapsLoaded(true);
      });
      script.addEventListener("error", () => {
        console.error("Error loading Google Maps script");
      });
      document.head.appendChild(script);
    };

    if (!googleMapsLoaded) {
      loadGoogleMapsScript();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdEvent = {
      title,
      description,
      languages,
      address,
      date,
      time,
      endTime,
      host: currentUser._id,
      attendees: [currentUser._id],
    };

    const res = await dispatch(createEvent(createdEvent));
    if (res?.title) {
      dispatch(closeModal());
      history.push(`/events/${res._id}`);
    }
  };

  const handleAddressChange = (address) => {
    setAddress(address);
    setAddressSuggestions([]);

    if (address.trim() === "") {
      return;
    }

    const requestOptions = {
      input: address,
    };

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(requestOptions, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setAddressSuggestions(predictions);
      }
    });
  };

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);

      setSelectedAddress(address);

      const streetAddress = results[0]?.formatted_address.split(",")[0].trim();
      setAddress(streetAddress);
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&placeid=${placeId}&libraries=places`
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
        case "address":
          setAddress(e.currentTarget.value);
          break;
        case "date":
          setDate(new Date(e.target.value));
          break;
        case "time":
          setTime(e.currentTarget.value);
          break;
        case "endTime":
          setEndTime(e.currentTarget.value);
          break;
        default:
          console.error("Field name error");
          break;
      }
    };
  };

  const firstSix = [
    "Arabic",
    "English",
    "French",
    "German",
    "Hindi",
    "Japanese",
  ];

  const lastSix = [
    "Korean",
    "Mandarin",
    "Portugese",
    "Russian",
    "Spanish",
    "Swahili",
  ];

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

  const addLanguage = (lang) => (e) => {
    setLanguages([...languages, lang]);
  };

  const removeLanguage = (lang) => (e) => {
    setLanguages(languages.filter((val) => val !== lang));
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Host an Exchange</h2>

      <div className="selects">
        <div className="select">
          <div className="time-select">
            <select value={time} onChange={update("time")}>
              <option disabled value="">
                Start Time
              </option>
              {generateTimeOptions()}
            </select>
          </div>

          <div className="time-select">
            <select value={endTime} onChange={update("endTime")}>
              <option disabled value="">
                End Time
              </option>
              {generateTimeOptions()}
            </select>
          </div>
          <div className="errors time-error">{errors?.time}</div>
        </div>
      </div>

      <div className="select">
        <div className="languages-container">
          <div className="errors lang-error">{errors?.languages}</div>
          <div className="top-language-container">
            {firstSix.map((lang) => {
              return languages?.includes(lang) ? (
                <div className="event-unselect-btn lang-btn" key={lang}>
                  <div>{lang}</div>
                  <div className="x-button" onClick={removeLanguage(lang)}>
                    &times;
                  </div>
                </div>
              ) : (
                <div className="event-select-btn lang-btn" key={lang}>
                  <span onClick={addLanguage(lang)}>{lang}</span>
                </div>
              );
            })}
          </div>
          <div className="bottom-language-container">
            {lastSix.map((lang) => {
              return languages?.includes(lang) ? (
                <div className="event-unselect-btn lang-btn" key={lang}>
                  <div>{lang}</div>
                  <div className="x-button" onClick={removeLanguage(lang)}>
                    &times;
                  </div>
                </div>
              ) : (
                <div className="event-select-btn lang-btn" key={lang}>
                  <span onClick={addLanguage(lang)}>{lang}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="inputs">
        <div className="left-column">
          <div className="title-error errors">{errors?.title}</div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={update("title")}
          />

          <div className="date-error errors">{errors?.date}</div>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="address-error errors">{errors?.address}</div>

          {googleMapsLoaded && (
            <PlacesAutocomplete
              value={address}
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

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className: "suggestion-item",
                          })}
                          key={index}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          )}
        </div>
      </div>

      <div className="description-error errors">{errors?.description}</div>
      <textarea
        placeholder="Description"
        value={description}
        onChange={update("description")}
        className="description-textarea"
      ></textarea>

      <input type="submit" value="Create Exchange" />
    </form>
  );
};

export default EventForm;
