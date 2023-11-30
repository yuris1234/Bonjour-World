import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

export const EventMap = ({events, markerEventHandlers, mapEventHandlers }) => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markersRef = useRef(null);


    const getAddressCoordinates = async (address, apiKey) => {
        try {
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_MAPS_API_KEY}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;
                debugger
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
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
        // If the map is not yet set, create a new google.maps.Map object
        if (!map) {
            // Default values for the map, such as zoom level and center
            const defaultMapOptions = {
                zoom: 11,
                center: { lat: 40.7128, lng: -74.0060 }, // New York as an example
            };
            // Create a new Google Map object with mapRef as its first argument
            const newMap = new window.google.maps.Map(mapRef.current, {
                ...defaultMapOptions,
                 // Override defaults with provided mapOptions
            });

            setMap(newMap);

        }
    });

    useEffect(() => {
        const newMarkers = {};
        Object.values(events).forEach(async (event) => {
            try {
                const { _id, address } = event;
                const testAddress = '1600 Amphitheatre Parkway, Mountain View, CA';
        
                // Get coordinates using the getAddressCoordinates function
                const position = await getAddressCoordinates(address, process.env.REACT_APP_MAPS_API_KEY);

                // Add a null check for markersRef.current
                if (!markersRef.current || !markersRef.current[_id]) {
              // If no marker exists for the event, create one
                    const marker = new window.google.maps.Marker({
                    position,
                    map,
                    // ...other marker options
                });

                    newMarkers[_id] = marker;
                } else {
              // If a marker already exists for the event, reuse it
                    newMarkers[_id] = markersRef.current[_id];
                }
            } catch (error) {
            console.error('Error fetching coordinates:', error);
            }
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
    }, [events]);

    
    return <div ref={mapRef} style={{ margin: "20px", height: '750px', width: '50%' }}>Map</div>
}


const EventsMapWrapper = ({ events, markerEventHandlers}) => {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}  >
            <EventMap events={events} markerEventHandlers={markerEventHandlers}/>
        </Wrapper>
    );
};

export default EventsMapWrapper;
