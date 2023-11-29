import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventIndexItem from './EventIndexItem';
import { getEvents, fetchEvents } from '../../store/events';
import './EventIndex.css';
import NavBar from '../NavBar'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';


const EventIndex = () => {
    const dispatch = useDispatch();
    const events = useSelector(getEvents);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const mapContainerStyle = {
        width: '100vw',
        height: '100vh',
    };

    const center = {
        lat: 7.2905715, // default latitude
        lng: 80.6337262, // default longitude
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAzrjxUj8NzVPJ8Gl4zB-_ifjNUdvBg2ew"
      });
    
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }

    return (
        <>
            <NavBar />
            <div className="event-index">
                <div className="google-maps-container">
                <div>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={10}
                        center={center}
                    >
                        <Marker position={center} />
                    </GoogleMap>
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
