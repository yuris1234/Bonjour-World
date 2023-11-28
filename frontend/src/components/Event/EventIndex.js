import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventIndexItem from './EventIndexItem';
import { getEvents, fetchEvents } from '../../store/events';
import './EventIndex.css';
import NavBar from '../NavBar';
import { useHistory } from 'react-router-dom';

const EventIndex = () => {
    const dispatch = useDispatch();
    const events = useSelector(getEvents);
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const redirectToEventShowPage = (eventId) => {
        history.push(`/events/${eventId}`);
    };

    return (
        <>
            <NavBar />
            <div className="event-index">
                <div className="google-maps-container">

                </div>
                <div className="display-all-events">
                    {events.map((event) => (
                        <EventIndexItem
                            key={event.id}
                            event={event}
                            onClick={() => redirectToEventShowPage(event.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default EventIndex;
