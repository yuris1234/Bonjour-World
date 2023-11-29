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

    useEffect(() => {
        const getAddressCoordinates = async (address, apiKey) => {
        try {
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            } else {
                throw new Error('No results found for the provided address.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
        // Example usage
        const apiKey = process.env.REACT_APP_MAPS_API_KEY;
        const address = '1600 Amphitheatre Parkway, Mountain View, CA';
        getAddressCoordinates(address, apiKey);
    }, []);

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
