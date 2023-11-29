import React from 'react';
import './EventIndexItem.css'
import { useHistory } from 'react-router-dom';

const EventIndexItem = ({ event }) => {
    const history = useHistory();

    const redirectShow = () => {
        history.push(`/events/${event._id}`)
    }

    return (
        <>
            <div className="event-item" onClick={redirectShow}>
                <div className="event-item-time">{event.title}</div>
                <br />
                <div className="event-item-description">{event.description}</div>
                <br />
                <div className="event-item-location">{event.city}</div>
            </div>
        </>
    );
};

export default EventIndexItem;