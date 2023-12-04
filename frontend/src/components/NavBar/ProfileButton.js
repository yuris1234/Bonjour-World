import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import "./ProfileButton.css";
import ProfileBtnIcon from "../Images/EmptyUser.png";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const history = useHistory();
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <button className="profile-btn" onClick={openMenu}>
        <img alt="" className="profile-btn-icon" src={ProfileBtnIcon} />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <Link to={"/profile"} id="profile-link">Profile</Link>
          </li>
          <li>
            <button onClick={logoutUser} className="logout-button">
              Log Out
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;