import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

export const EventMap = ({events, markerEventHandlers, highlightedEvent, mapOptions}) => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markersRef = useRef(null);

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
        if (!map) {
            const defaultMapOptions = {
                zoom: 11,
                center: { lat: 40.7128, lng: -74.0060 }, // New York as an example
            };
            // Create a new Google Map object with mapRef as its first argument
            const newMap = new window.google.maps.Map(mapRef.current, {
                ...defaultMapOptions, //add mapOptions here spread in if i want to override
                ...mapOptions
            });
            setMap(newMap);
        }
    });

    useEffect(() => {
        const newMarkers = {};
            debugger
            Object.values(events).forEach(async (event) => {
                try {
                    const { _id, address } = event;
                    const formattedAddress = `${event.address}, ${event.city}, ${event.state} ${event.zipcode}`;
                    const position = await getAddressCoordinates(formattedAddress);
                    
                    if (!markersRef.current || !markersRef.current[_id]) {
                        // If no marker exists for the event, create one
                        const marker = new window.google.maps.Marker({
                            position,
                            map
                        });
                        // Attach marker event handlers
                        Object.entries(markerEventHandlers).forEach(([eventType, handler]) => {
                            marker.addListener(eventType, () => handler(event));
                        });
                        
                        newMarkers[_id] = marker;
                    } else {
                        // If a marker already exists for the event, reuse it
                        newMarkers[_id] = markersRef.current[_id];
                    }
                } catch (error) {
                    console.error('Error fetching coordinates:', error);
                }
                Object.values(markersRef.current).forEach((marker) => {
                    const eventId = marker.get('eventId');
                    if (eventId === highlightedEvent?._id) {
                      // Apply custom styling for highlighted event
                      marker.setIcon(null); // Reset icon
                      marker.setOptions({ backgroundColor: 'yellow' }); // Set background color
                    } else {
                      // Apply standard styling for other events
                      marker.setOptions({ backgroundColor: 'red' }); // Set standard background color
                    }
                });
        });
            // Remove markers for events that no longer exist
            if (markersRef.current) {
                Object.keys(markersRef.current).forEach((id) => {
                    if (!newMarkers[id]) {
                        markersRef.current[id].setMap(null);
                    }
                });
            }
            
            // Update the markers ref with the new set of markers
            markersRef.current = newMarkers;
        }, [events, markerEventHandlers]);
        
        return <div ref={mapRef} style={{ margin: "20px", height: '750px', width: '50%' }}>Map</div>
    }
    
    const EventsMapWrapper = ({ events, markerEventHandlers, highlightedEvent}) => {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}  >
            <EventMap events={events} markerEventHandlers={markerEventHandlers} highlightedEvent={highlightedEvent}/>
        </Wrapper>
    );
};

export default EventsMapWrapper;
