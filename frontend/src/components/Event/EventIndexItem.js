import React from 'react';
import './EventIndexItem.css'
import { useHistory } from 'react-router-dom';

const EventIndexItem = ({ event, setHighlightedEvent }) => {
    const history = useHistory();

    const redirectShow = () => {
        history.push(`/events/${event._id}`)
    }

    const handleMouseOver = () => {
        setHighlightedEvent(event);
    };
    
    const handleMouseOut = () => {
        setHighlightedEvent(null);
    };

    return (
        <>
            <div className="event-item" onClick={redirectShow} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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