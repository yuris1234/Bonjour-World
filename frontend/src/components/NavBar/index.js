import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import "./NavBar.css";
import { logout } from "../../store/session";
import { openModal } from "../../store/modal";

const NavBar = () => {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={"/events"}>All Events</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/events/new"}>Create an Event</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <div>
            <button onClick={() => dispatch(openModal("signup"))}>
              Signup
            </button>
            <button onClick={() => dispatch(openModal("login"))}>Login</button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <h1>Bonjour World</h1>
      {getLinks()}
    </>
  );
};

export default NavBar;
