import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./ShowMap.css"

export const EventShowMap = ({events, markerEventHandlers, highlightedEvent, mapOptions, language}) => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markersRef = useRef(null);
    const center = useSelector(state => state.events.center)
    // console.log(language)

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
        const customStyle =
            
        [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e7d5ba"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#615439"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e7d5ba"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e7d5ba"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eee4d4"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#eee4d4"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#eee4d4"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "0"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#eee4d4"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fcefd2"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fcefd2"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fcefd2"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "hue": "#ffb000"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fcefd2"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#7dacbc"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
        if (!map) {
            const defaultMapOptions = {
                zoom: 11,
                center: { lat: 40.7128, lng: -74.0060 }, // New York as an example
            };
            // Create a new Google Map object with mapRef as its first argument
            let newMap = new window.google.maps.Map(mapRef.current, {
                ...defaultMapOptions, 
                ...mapOptions
            });
            newMap.setOptions({styles: customStyle})
            setMap(newMap);
        } else if (mapOptions){
            // If map already exists, update its options
            map.setOptions({
                center: mapOptions.center,
                zoom: 17
            });
        }
    }, [map, mapOptions, language]);

    useEffect(() => {
        const newMarkers = {};
            Object.values(events).forEach(async (event) => {
                if (language && !event.language.includes(language)) {
                    return;
                }
                // console.log(language)
                try {
                    const formattedAddress = `${event.address}, ${event.city}, ${event.state} ${event.zipcode}`;
                    const position = await getAddressCoordinates(formattedAddress);
                    if (!markersRef.current || !markersRef.current[event._id]) {
                        // If no marker exists for the event, create one
                        const marker = new window.google.maps.Marker({
                            position,
                            map
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
                    console.error('Error fetching coordinates:', error);
                }
                // Object.values(markersRef.current).forEach((marker) => {
                //     const eventId = marker.get('eventId');
                //     if (eventId === highlightedEvent?._id) {
                //       // Apply custom styling for highlighted event
                //       marker.setIcon(null); // Reset icon
                //       marker.setOptions({ backgroundColor: 'yellow' }); // Set background color
                //     } else {
                //       // Apply standard styling for other events
                //       marker.setOptions({ backgroundColor: 'red' }); // Set standard background color
                //     }
                // });
        });
            // Remove markers for events that no longer exist
            if (markersRef.current) {
                Object.keys(markersRef.current).forEach((id) => {
                    debugger
                    if (!newMarkers[id] || (language && events[id].language !== language)) {
                        markersRef.current[id].setMap(null);
                    }
                });
            }
            // Update the markers ref with the new set of markers
            markersRef.current = newMarkers;

        }, [events, map, mapOptions, language]);
     

        
        return <div className="event-show-map" ref={mapRef} style={{ paddingTop: "50px", borderRadius: "18px", height: '100%', width: '70%',  }}>Map</div>
    }
    
    const EventShowMapWrapper = ({ events, markerEventHandlers, mapOptions, language}) => {
        
        
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} >
            <EventShowMap events={events} markerEventHandlers={markerEventHandlers} mapOptions={mapOptions} language={language}/>
        </Wrapper>
    );
};

export default EventShowMapWrapper;
