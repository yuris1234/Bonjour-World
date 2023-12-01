import { useDebugValue, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, fetchEvent } from '../../store/events';
import NavBar from '../NavBar';
import "./EventShow.css"
import { addEventJoin, fetchUsers, removeEventJoin } from '../../store/users';
import { getCurrentUser } from '../../store/session';
import { openModal, updateEvent } from '../../store/modal';
import { getUsers } from '../../store/users';
import EventsMapWrapper from '../EventMap';

const EventShow = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const event = useSelector(getEvent(eventId))
    const user = useSelector((state) => state.session.user);
    const users = useSelector(getUsers(eventId));
    const [subscribed, setSubscribed] = useState(false);
    const [hostShow, setHostShow] = useState(false);
    const [host, setHost] = useState("");

    useEffect(() => {
        dispatch(getCurrentUser());
        dispatch(fetchUsers());
        dispatch(fetchEvent(eventId));
    },[eventId])

    useEffect(() => {
        if (user?.events) {
            if (subscribed === false) {
                setSubscribed(user.events.includes(eventId) ? true : false)
            }
        }
        if (event) {
            if (user && user?._id === event.host) {
                setHostShow(true)
            }
        }
        
        if (event && users?.length > 0) {    
            users.forEach((user) => {
                if (user._id === event.host) {
                    setHost(user.username)
                }
            })
        }
    },[user, event])

    const handleJoin = async (e) => {
        e.preventDefault();
        setSubscribed(true);
        await dispatch(addEventJoin(user._id, eventId));
    }

    const handleUnjoin = async (e) => {
        e.preventDefault();
        if (user.username !== host) {
            setSubscribed(false);
            await dispatch(removeEventJoin(user._id, eventId));
        }
    }

    const handleModal = (e) => {
        dispatch(updateEvent("updateEvent", eventId));
    }

    return (
        <>
            <NavBar />
            <div className="event-show-index">
                {event && (
                
                    <EventsMapWrapper events={event}/>
                
                )}

                <div className="display-one-event">
                    <ul className="event-info-list">
                        <div className="event-title">{event?.title}
                            <div className="event-title-hosted-by">Hosted By:
                                <div className="event-title-host">{host}</div>
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
                                {event?.city}, {event?.state} {event?.zipcode}
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
                        {hostShow && <button class="edit-event" onClick={handleModal}>Edit Event</button>}
                        {!subscribed && user &&
                            <button className="join-event" onClick={handleJoin}>+ Join </button>
                        }
                        {subscribed && user &&
                            <button class="unjoin-event" onClick={handleUnjoin}>Joined</button>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default EventShow;