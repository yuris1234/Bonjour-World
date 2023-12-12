import { useDebugValue, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, fetchEvent, setCenter, createJoinRequest, deleteJoinRequest } from '../../store/events';
import NavBar from '../NavBar';
import "./EventShow.css"
import { addEventJoin, fetchUsers, removeEventJoin } from '../../store/users';
import { getCurrentUser } from '../../store/session';
import { openModal, updateEvent } from '../../store/modal';
import { getAttendees } from '../../store/users';
import EventsMapWrapper from '../EventMap';
import { getHost } from '../../store/users';

const EventShow = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();

    const event = useSelector(getEvent(eventId))

    // grabs current user
    const user = useSelector((state) => state.session.user);

    // grabs the host (user) of the event
    const host = useSelector(getHost(event));

    // grabs the array of attendees for this event
    const attendees = useSelector(getAttendees(event));

    // subscribed = sent a join request
    const [subscribed, setSubscribed] = useState(false);
    // joined = actually joined event, host has accepted it
    const [joined, setJoined] = useState(false);
    // isHost = true if current user is the host of the event
    const [isHost, setIsHost] = useState(false);

    const [mapOptions, setMapOptions] = useState({});

    useEffect(() => {
        dispatch(getCurrentUser());
        dispatch(fetchUsers());
        dispatch(fetchEvent(eventId));        
    },[eventId])

    useEffect(() => {
        if (event?.attendees.includes(user?._id)) {
            // set current user's status to "requested to join"
            setJoined(true);
        }
    
        if (event?.pendingAttendees.includes(user?._id)) {
            // set current user's status to "joined"
            setSubscribed(true);
        }

        if (host?._id === user?._id) {
            // sets isHost to true if current user is the host, can edit or delete event
            setIsHost(true);
        }
    },[user, event, host])

    const handleJoin = async (e) => {
        e.preventDefault();
        setSubscribed(true);
        await dispatch(createJoinRequest(eventId, user._id));
    }

    const handleUnjoin = async (e) => {
        e.preventDefault();
        if (user._id !== host._id) {
            if (subscribed) {
                // delete join request
                await dispatch(deleteJoinRequest(eventId, user._id));
            } else {
                // delete event attendance
                await dispatch(removeEventJoin(user._id, eventId));
            }
            setSubscribed(false);
            setJoined(false);
        }
    }

    const handleModal = (e) => {
        dispatch(updateEvent("updateEvent", eventId));
    }

    const history = useHistory()

    // const handleDeleteEvent = () => {
    //     dispatch(deleteEvent(eventId))
    //     history.push("/events")
    // }

    const getAddressCoordinates = async (address) => {

        try {
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_MAPS_API_KEY}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;
                return new window.google.maps.LatLng(latitude, longitude);
            } else {
                throw new Error('No results found for the provided address.');
            }
        } catch (error) {
            console.error('Error:', error);
          throw error; // Re-throw the error to handle it in the calling code
        }
    };

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const formattedAddress = `${event.address}, ${event.city}, ${event.state} ${event.zipcode}`;
                const coordinates = await getAddressCoordinates(formattedAddress);
                const centered = {
                    zoom: 11, // Set the initial zoom level as needed
                    center: { lat: coordinates.lat(), lng: coordinates.lng() }
                }
                setMapOptions(centered);
                // dispatch(setCenter(centered))
            } catch (error) {
                console.error('Error fetching map data:', error);
                // Handle error as needed
            }
        };
        
        fetchMapData();
    }, [event]);

    return (
        <>
            <NavBar />
            <div className="event-show-index">
                {event && (
                
                    <EventsMapWrapper events={[event]} mapOptions={mapOptions}/>
                
                )}

                <div className="display-one-event">
                    <ul className="event-info-list">
                        <div className="event-title">{event?.title}
                            <div className="event-title-host">Hosted By: {host?.username}
                            </div>
                        </div>

                        <div className='event-details'>
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

                            {isHost && <button class="edit-event" onClick={handleModal}>Edit Event</button>}
        
                            {user && (joined || subscribed) && (
                                <button class="unjoin-event" onClick={handleUnjoin}>{joined ? "Joined" : (subscribed ? "Request Sent" : "")}</button>
                            )}
                       
                            {/* create a request to join button if a user is logged in and current status is neither subscribed or joined */}
                            {user && !subscribed && !joined && (<button className="join-event" onClick={handleJoin}>+ Request to Join </button>)}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default EventShow;