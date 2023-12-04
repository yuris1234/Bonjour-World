import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../store/session';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import EmptyUser from '../Images/EmptyUser.png'
import EventsMapWrapper from '../EventMap';
import EventIndexItem from '../Event/EventIndexItem';
import { fetchEvents, getRelevantEvents } from '../../store/events';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import empty-user from '../Images/empty-user.jpeg';

const UserProfile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);
    const events = useSelector(getRelevantEvents(user?._id));
    const [highlightedEvent, setHighlightedEvent] = useState();

    useEffect(() => {
        dispatch(getCurrentUser());
        dispatch(fetchEvents());
        setFadeIn(true);
    }, []);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };

            reader.readAsDataURL(selectedImage);
        }
    };

    const markerEventHandlers = {
        click: (event) => {
          // Navigate to the event's show page
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
        <div className={`app-container ${fadeIn ? 'fade-in' : ''}`}>
            <NavBar />
            <div className={`profile-container ${fadeIn ? 'fade-in' : ''}`}>
                <div className={`profile-details-div ${fadeIn ? 'fade-in' : ''}`}>
                    <div className="profile-img-div">

                        {/* <div className="profile-back-to-main-div">
                            <button className="profile-back-to-main-button">
                                <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '40px', color: '#022a54f0' }} />
                            </button>
                        </div> */}

                        <div className="profile-img-container">
                            <img className="profile-img" alt="uploaded-user" src={EmptyUser} />
                            <label htmlFor="imageInput" className="upload-label">
                                Upload Image
                                <input
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                            
                        <div className="profile-details">
                            <div className="profile-label">{user?.firstName} {user?.lastName}</div>
                            <div className="profile-label">{user?.username}</div>
                        </div>
                    </div>

                <div className="event-container">
                    <h1 className="event-header">{user?.firstName}'s Events</h1>
                    <div className="display-all-events">
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

