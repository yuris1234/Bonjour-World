import { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const markerEventHandlers = {
        click: (eventId) => {
          // Navigate to the event's show page
            history.push(`/events/${eventId}`);
        },
    };

    const mapEventHandlers = {
        click: (event) => {
            const { latLng } = event;
            const lat = latLng.lat();
            const lng = latLng.lng();
    
          // Convert latLng to a query string
            const queryString = new URLSearchParams({ lat, lng }).toString();
    
          // Navigate to the new event page with a query string
            history.push({
                pathname: '/new-event-page',
                search: queryString,
            });
        },
    };

    return (
        <>
            <NavBar />
            <div className="event-index">
                <div className="google-maps-container">
                <div>
                    <EventsMapWrapper events={events} mapEventHandlers={mapEventHandlers} markerEventHandlers={markerEventHandlers} />
                </div>
                </div>
                <div className="display-all-events">
                    {events.map((event) => (
                        <EventIndexItem key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default EventIndex;
