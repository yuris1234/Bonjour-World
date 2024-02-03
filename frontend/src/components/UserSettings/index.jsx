import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Event/EventForm.css";
import { closeModal } from "../../store/modal";
import { clearUpdateUserErrors, updateUser } from "../../store/users";
import { receiveCurrentUser } from "../../store/session";

const UserSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const errors = useSelector((state) => state.errors.updateUser);

  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [languages, setLanguages] = useState(user?.languages);

  useEffect(() => {
    dispatch(receiveCurrentUser(user))
    setUsername(user?.username);
    setEmail(user?.email);
    setLanguages(user?.languages);
  }, [user, dispatch]);

  useEffect(() => {
    return () => dispatch(clearUpdateUserErrors());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      username,
      email,
      languages
    };
    const res = await dispatch(updateUser(updatedUser));

    if (res.ok) {
      dispatch(closeModal());
    }
  };

  const update = (field) => {
    return (e) => {
      switch (field) {
        case "username":
          setUsername(e.currentTarget.value);
          break;
        case "email":
          setEmail(e.currentTarget.value);
          break;
        case "language":
          setLanguages(e.currentTarget.value);
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

  const addLanguage = (lang) => (e) => {
    setLanguages([...languages, lang])
  }

  const removeLanguage = (lang) => (e) => {
    setLanguages(languages.filter(val => val !== lang))
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Hi, {user?.firstName} {user?.lastName}</h2>

      {/* <div className="selects">
        <div className="select">
          <div className="errors">{errors?.time}</div>
          <div className="event-select-btn">
            <select value={time} onChange={update("time")}>
              <option disabled value="">
                Start Time
              </option>
              {generateTimeOptions()}
            </select>
          </div>
        </div>

        <div className="event-select-btn">
          <select value={endTime} onChange={update("endTime")}>
            <option disabled value="">
              End Time
            </option>
            {generateTimeOptions()}
          </select>
        </div>
      </div> */}

      <div className="inputs">
        <div className="left-column">
          {/* <div className="title-error errors">{errors?.title}</div>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={update("title")}
          /> */}

          <div className="date-error errors">{errors?.username}</div>
          <input
            type="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <div className="errors">{errors?.email}</div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={update("email")}
          />
        </div>
      </div>

      <div className="select">
        <div className="errors">{errors?.languages}</div>

        <div className="languages-container">
          <div className="top-language-container">
            {firstSix.map((lang) => {
              return languages?.includes(lang) ? (
                <div className="event-unselect-btn">
                  <div>{lang}</div>
                  <div className="x-button" onClick={removeLanguage(lang)}>
                    &times;
                  </div>
                </div>
              ) : (
                <div className="event-select-btn lang">
                  <span onClick={addLanguage(lang)}>{lang}</span>
                </div>
              );
            })}
          </div>
          <div className="bottom-language-container">
            {lastSix.map((lang) => {
              return languages?.includes(lang) ? (
                <div className="event-unselect-btn">
                  <div>{lang}</div>
                  <div className="x-button" onClick={removeLanguage(lang)}>
                    &times;
                  </div>
                </div>
              ) : (
                <div className="event-select-btn lang">
                  <span onClick={addLanguage(lang)}>{lang}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <input type="submit" value="Save" />
    </form>
  );
};

export default UserSettings;
