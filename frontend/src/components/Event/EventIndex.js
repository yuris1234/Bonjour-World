import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventIndexItem from './EventIndexItem';
import { getEvents, fetchEvents } from '../../store/events';
import './EventIndex.css';
import NavBar from '../NavBar'
import EventsMapWrapper, { EventMap } from '../EventMap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FilterForm from '../EventMap/FilterForm';

const EventIndex = () => {
    const dispatch = useDispatch();
    const events = useSelector(getEvents);
    const history = useHistory();
    const [highlightedEvent, setHighlightedEvent] = useState();
    const [language, setLanguage] = useState("")
    const [state, setState] = useState("")

    useEffect(() => {
        const filters = {
            language: language,
            state: state
        };
        dispatch(fetchEvents(filters));
    }, [dispatch, language, state]);

    const markerEventHandlers = {
        click: (event) => {
          // Navigate to the event's show page
            history.push(`/events/${event._id}`);
        }
        // mouseover: (event) => {
        //     setHighlightedEvent(event);
        // },
        // mouseout: () => {
        //     setHighlightedEvent(null);
        // },
    };


    return (
      <>
        <NavBar />
        <div className="event-index">
          <EventsMapWrapper
            events={events}
            markerEventHandlers={markerEventHandlers}
            highlightedEvent={highlightedEvent}
            langauge={language}
          />
          <div className="display-all-events">
            <FilterForm language={language} setLanguage={setLanguage} state={state} setState={setState} />
            {Object.values(events).map((event) => (
              <EventIndexItem
                key={event._id}
                event={event}
                highlightedEvent={highlightedEvent}
                setHighlightedEvent={setHighlightedEvent}
              />
            ))}
          </div>
        </div>
      </>
    );
};

export default EventIndex;
