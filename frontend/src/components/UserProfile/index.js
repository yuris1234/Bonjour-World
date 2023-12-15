import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../../store/session";
import NavBar from "../NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EmptyUser from "../Images/EmptyUser.png";
import EventsMapWrapper from "../EventMap";
import EventIndexItem from "../Event/EventIndexItem";
import { fetchEvents, getRelevantEvents } from "../../store/events";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import S3 from "./aws.js";
import { getHostedEvents } from "../../store/events";
import Notification from "./Notification/index.js";

const UserProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // get current user
  const user = useSelector((state) => state.session.user);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  // get all events user is attending
  const events = useSelector(getRelevantEvents(user?._id));

  // get all hosted events for current user
  const hostedEvents = useSelector(getHostedEvents(user?._id));

  const [highlightedEvent, setHighlightedEvent] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserData = await getCurrentUser();
        let profileImageUrl = currentUserData.profileImageUrl;

        if (!profileImageUrl) {
          const params = {
            Bucket: "bonjour-world",
            Prefix: `user/${user?._id}/`,
          };

          const data = await S3.listObjectsV2(params).promise();

          const mostRecentImage = data.Contents[0];

          if (mostRecentImage) {
            profileImageUrl = S3.getSignedUrl("getObject", {
              Bucket: "bonjour-world",
              Key: mostRecentImage.Key,
            });
          }
        }

        setUploadedImage(profileImageUrl || EmptyUser);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    dispatch(fetchEvents());
    fetchUserData();
    setFadeIn(true);
  }, []);

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const params = {
        Bucket: "bonjour-world",
        Key: `user/${user?._id}/${selectedImage.name}`,
        Body: selectedImage,
        ACL: "public-read",
      };

      try {
        console.log("Upload params:", params);
        const data = await S3.upload(params).promise();
        console.log("Upload successful:", data);
        setUploadedImage(data.Location);
      } catch (error) {
        console.error("Error uploading image to S3:", error);
      }
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const markerEventHandlers = {
    click: (event) => {
      history.push(`/events/${event._id}`);
    },
    mouseover: (event) => {
      setHighlightedEvent(event);
    },
    mouseout: () => {
      setHighlightedEvent(null);
    },
  };

  return (
    <div className={`app-container ${fadeIn ? "fade-in" : ""}`}>
      <div className={`profile-container ${fadeIn ? "fade-in" : ""}`}>
        <div className={`actual-profile-container ${fadeIn ? "fade-in" : ""}`}>
          <div id="left-side">
            <div id="left-side-top">
                Hello, {user?.firstName} {user?.lastName}
            </div>
            <div id="left-side-bottom">
              <div className="profile-details">
                <div className="profile-img-container">
                  <img className={`profile-img visible`} src={user?.pfp} alt=""/>
                    {/* {!imageLoaded && (
                      <div className="loading-spinner">Loading...</div>
                    )} */}
                    {/* <label htmlFor="imageInput" className="upload-label">
                      Upload Image
                      <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      />
                    </label> */}
                </div>
                <div className="profile-detail">{user?.username}</div>
                <h2 id="profile-details-banner">Bio</h2>
                <div className="profile-detail">{user?.bio}</div>
                <h2 id="profile-details-banner">Languages</h2>
                <div className="profile-detail">{user?.languages}</div>
              </div>

              <div className="notifications-div">
                <h2 id="notifications-title">Join Requests</h2>
                <div className="pending-div">
                  {hostedEvents.map((event) => {
                    return <Notification event={event} />;
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="event-container">
            <h2 className="event-header">Your Events</h2>
            {/* <h1 className="event-header">{user?.firstName}'s Events</h1> */}
            <div className="display-users-events">
              {events?.map((event) => (
                <EventIndexItem
                  key={event._id}
                  event={event}
                  highlightedEvent={highlightedEvent}
                  setHighlightedEvent={setHighlightedEvent}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
