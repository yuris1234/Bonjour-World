import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventIndexItem from './EventIndexItem';
import { getEvents, fetchEvents } from '../../store/events';
import './EventIndex.css';
import NavBar from '../NavBar'
import EventsMapWrapper, { EventMap } from '../EventMap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const EventIndex = () => {
    const dispatch = useDispatch();
    const events = useSelector(getEvents);
    const history = useHistory();
    const [highlightedEvent, setHighlightedEvent] = useState();

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

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
        <>
            <NavBar />
            <div className="event-index">
                    <EventsMapWrapper events={events} markerEventHandlers={markerEventHandlers} />
                <div className="display-all-events">
                    {Object.values(events).map((event) => (
                        <EventIndexItem
                            key={event._id}
                            event={event}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default EventIndex;
