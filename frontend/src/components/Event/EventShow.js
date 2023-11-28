import { useDebugValue, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, fetchEvent } from '../../store/events';
import NavBar from '../NavBar';
import "./EventShow.css"

const EventShow = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const event = useSelector(getEvent(eventId))

    useEffect(() => {
        dispatch(fetchEvent(eventId))
    },[])

    return (
        <>
            <NavBar />
            <div className="event-show-index">
                <div className="google-maps-show-container">

                </div>
                <div className="display-one-event">
                    <ul className="event-info-list">
                        <li>
                        <label className="event-title">Title: {event?.title}</label>
                        </li>
                        <li>
                        <label className="event-description">Description: {event?.description}</label>
                        </li>
                        <li>
                        <label className="event-language">Language: {event?.language}</label>
                        </li>
                        <li>
                        <label className="event-state">State: {event?.state}</label>
                        </li>
                        <li>
                        <label className="event-city">City: {event?.city}</label>
                        </li>
                        <li>
                        <label className="event-address">Address: {event?.address}</label>
                        </li>
                        <li>
                        <label className="event-zipcode">Zip Code: {event?.zipcode}</label>
                        </li>
                        <li>
                        <label className="event-lat">Latitude: {event?.lat}</label>
                        </li>
                        <li>
                        <label className="event-long">Longitude: {event?.long}</label>
                        </li>
                        <li>
                        <label className="event-date">Date: {event?.date}</label>
                        </li>
                        <li>
                        <label className="event-time">Time: {event?.time}</label>
                        </li>
                        <li>
                        <label className="event-host">Host: {event?.host}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default EventShow;