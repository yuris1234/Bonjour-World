
import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const EventShowMap = ({ event, markerEventHandlers, highlightedEvent, mapOptions, language }) => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markersRef = useRef({});
    const center = useSelector((state) => state.events.center);

    const getAddressCoordinates = async (address) => {
    try {
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
        )}&key=${process.env.REACT_APP_MAPS_API_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        return new window.google.maps.LatLng(latitude, longitude);
        } else {
        throw new Error("No results found for the provided address.");
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
    };

    const initMap = () => {
    if (!map) {
        const defaultMapOptions = {
        zoom: 11,
        center: { lat: 40.7128, lng: -74.0060 }, // New York as an example
        };

        let newMap = new window.google.maps.Map(mapRef.current, {
        ...defaultMapOptions,
        ...mapOptions,
        });

        setMap(newMap);
    } else if (mapOptions) {
        map.setOptions({
        center: mapOptions.center,
        zoom: 17,
        });
    }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);

        return () => {
            // Cleanup script on component unmount
            document.head.removeChild(script);
        };
    }, [mapOptions]);

    useEffect(() => {
        const updateMap = async () => {
            const newMarkers = {};
        
            try {
            const formattedAddress = `${event?.address}, ${event?.city}, ${event?.state} ${event?.zipcode}`;
            const position = await getAddressCoordinates(formattedAddress);
            

            if (!markersRef.current || !markersRef.current[event._id]) {
                // If no marker exists for the event, create one
                const marker = new window.google.maps.Marker({
                position: mapOptions.center,
                map: mapRef.current,
                });
                // Attach marker event handlers
                Object.entries(markerEventHandlers).forEach(([eventType, handler]) => {
                marker.addListener(eventType, () => handler(event));
                });
        
                newMarkers[event._id] = marker;
            } else {
                // If a marker already exists for the event, reuse it
                newMarkers[event._id] = markersRef.current[event._id];
            }
            } catch (error) {
            console.error("Error fetching coordinates:", error);
            }
        
            // Remove markers for events that no longer exist
            // if (markersRef.current) {
            // Object.keys(markersRef.current).forEach((id) => {
            //     if (!newMarkers[id] || (language && event.language !== language)) {
            //     markersRef.current[id].setMap(null);
            //     }
            // });
            // }
        
            // Update the markers ref with the new set of markers
            markersRef.current = newMarkers;
        };
        
        updateMap();
        }, [event, mapRef, map, language]);

    return <div ref={mapRef} style={{ margin: "20px", height: "750px", width: "50%" }}>Map</div>;
};

const EventShowMapWrapper = ({ event, markerEventHandlers, mapOptions, language }) => {
    const apiKey = process.env.REACT_APP_MAPS_API_KEY;

    return (
        <Wrapper apiKey={apiKey}>
            <EventShowMap event={event} markerEventHandlers={markerEventHandlers} mapOptions={mapOptions} language={language} />
        </Wrapper>
    );
};

export default EventShowMapWrapper;
