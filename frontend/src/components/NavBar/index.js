import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../store/modal";
import "./index.css";
import ProfileButton from "./ProfileButton";

const NavBar = () => {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="logged-in-links">
          <Link className="logged-in-link" id="about-us" to={"/aboutus"}>
            About Us
          </Link>
          <Link className="logged-in-link" id="all-events" to={"/events"}>
            All Events
          </Link>
          <button
            className="logged-in-link"
            id="create-event-button"
            onClick={() => dispatch(openModal("createEvent"))}
          >
            Create an Event
          </button>
          <ProfileButton user={""} />
        </div>
      );
    } else {
      return (
        <div className="logged-out-links">
          <Link className="all-events no-underline" to={"/aboutus"}>
            About Us
          </Link>
          <Link className="all-events no-underline" to={"/events"}>
            All Events
          </Link>
          <button
            className="signup-button"
            onClick={() => dispatch(openModal("signup"))}
          >
            Signup
          </button>
          <button
            className="login-button"
            onClick={() => dispatch(openModal("login"))}
          >
            Login
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="no-underline">
          <h1 className="nav-bar-header">Bonjour World</h1>
        </Link>
        <div className="nav-links">{getLinks()}</div>
      </nav>
    </>
  );
};

export default NavBar;
