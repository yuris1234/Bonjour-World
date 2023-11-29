import { useDebugValue, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, fetchEvent } from '../../store/events';
import NavBar from '../NavBar';
import "./EventShow.css"
import { addEventJoin } from '../../store/users';
import { getCurrentUser } from '../../store/session';

const EventShow = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const event = useSelector(getEvent(eventId))
    const user = useSelector((state) => state.session.user);
    const [subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        dispatch(getCurrentUser());
        dispatch(fetchEvent(eventId));
    },[eventId])

    useEffect(() => {
        if (user.events) {
            setSubscribed(user.events.includes(eventId) ? true : false)
        }
    },[user])

    const handleJoin = (e) => {
        e.preventDefault();
        setSubscribed(true);
        dispatch(addEventJoin(user._id, eventId));
    }

    const handleUnjoin = (e) => {
        e.preventDefault();
        // dispatch(removeEventJoin(user._id, eventId));
    }

    return (
        <>
            <NavBar />
            <div className="event-show-index">
                <div className="google-maps-show-container">

                </div>
                <div className="display-one-event">
                    <ul className="event-info-list">
                        <div className="event-title">{event?.title}
                            <div className="event-title-hosted-by">Hosted By:
                                <div className="event-title-host">Potato.{event?.host}</div>
                            </div>
                        </div>

                        <span className="event-language">{event?.language}</span>

                        <div className="event-description-div">Description
                            <div className="event-description">{event?.description}</div>
                        </div>

                        <div className="event-date-div">Date
                            <div className="event-date">{event?.date}</div>
                        </div>

                        <div className="event-time-div">Time
                            <div className="event-time">{event?.time}</div>
                        </div>
                        
                        <div className="event-location-div">Location
                            <div className="event-location">
                                {event?.state}, {event?.city} {event?.zipcode}
                            </div>
                        </div>
    
                        <div className="event-address-div">Address
                            <div className="event-address">{event?.address}</div>
                        </div>
                        
                        <div className="event-lat-div">Latitude 
                            <div className="event-lat">{event?.lat}</div>
                        </div>

                        
                        <div className="event-long-div">Longitude
                            <div className="event-long">{event?.long}</div>
                        </div>
                        {!subscribed && 
                            <button className="event-language" onClick={handleJoin}>+ Join </button>
                        }
                        {subscribed && 
                            <button class="event-language" onClick={handleUnjoin}>Joined</button>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default EventShow;