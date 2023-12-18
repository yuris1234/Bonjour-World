import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import "../../static/images/noun-language-2511286.png";
import { US } from "country-flag-icons/react/3x2";
import { FR } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { ES } from "country-flag-icons/react/3x2";
import ReactDOMServer from "react-dom/server";

export const EventMap = ({
  events,
  markerEventHandlers,
  highlightedEvent,
  mapOptions,
  language,
}) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef(null);
  const center = useSelector((state) => state.events.center);

  const customMarker = "../../../public/story-map-svgrepo-com.png";

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
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  useEffect(() => {
    const customStyle = [
      {
        featureType: "landscape.man_made",
        elementType: "geometry",
        stylers: [
          {
            color: "#f7f1df",
          },
        ],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#d0e3b4",
          },
        ],
      },
      {
        featureType: "landscape.natural.terrain",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.business",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.medical",
        elementType: "geometry",
        stylers: [
          {
            color: "#fbd3da",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#bde6ab",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffe15f",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#efd151",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "black",
          },
        ],
      },
      {
        featureType: "transit.station.airport",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#cfb2db",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#a2daf2",
          },
        ],
      },
    ];
    if (!map) {
      const defaultMapOptions = {
        zoom: 13,
        center: { lat: 40.7128, lng: -74.006 }, // New York as an example
      };
      // Create a new Google Map object with mapRef as its first argument
      let newMap = new window.google.maps.Map(mapRef.current, {
        ...defaultMapOptions,
        ...mapOptions,
      });
      setMap(newMap);
      newMap.setOptions({ styles: customStyle });
    } else if (mapOptions) {
      // If map already exists, update its options
      map.setOptions({
        center: mapOptions.center,
        zoom: 17,
      });
    }
  }, [map, mapOptions, language]);

  useEffect(() => {
    const image =
      "https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/earth-icon.png";
      // "https://cdn.pixabay.com/photo/2012/04/11/11/39/group-27618_960_720.png";
    // const image = "https://www.svgrepo.com/show/399293/story-map.svg";
    const newMarkers = {};
    Object.values(events).forEach(async (event) => {
      if (language && !event.language.includes(language)) {
        return;
      }
      try {
        // const formattedAddress = `${event.address}, ${event.city}, ${event.state} ${event.zipcode}`;
        const formattedAddress = event.address;
        const position = await getAddressCoordinates(formattedAddress);
        if (!markersRef.current || !markersRef.current[event._id]) {
          // If no marker exists for the event, create one
          const marker = new window.google.maps.Marker({
            position,
            map,
            // icon: image,
            icon: {
              url: image,
              scaledSize: new window.google.maps.Size(40, 40),
            },
            optimized: false,
            disableAutoPan: true,
            animation: window.google.maps.Animation.DROP,
          });

          const flags =
            event.languages &&
            event.languages
              .map((language) => {
                switch (language) {
                  case "English":
                    return ReactDOMServer.renderToString(
                      <US className="map-flag" />
                    );
                  case "French":
                    return ReactDOMServer.renderToString(
                      <FR className="map-flag" />
                    );
                  case "German":
                    return ReactDOMServer.renderToString(
                      <DE className="map-flag" />
                    );
                  case "Spanish":
                    return ReactDOMServer.renderToString(
                      <ES className="map-flag" />
                    );
                  default:
                    return null;
                }
              })
              .join("");

          const infoWindowContent = `
                            <div style="display:flex; flex-direction: column; align-items:flex-start; padding: 10px; background-color: #ffffff; border: 2px solid #333333; border-radius: 5px;">
                                <h1 style="color: #333333; font-size: 16px; margin-bottom: 10px;">${event.title}</h1>
                                <div style="color: #666666; font-size: 14px;">${flags}</div>
                                <div style="color: #666666; font-size: 10px;">Number Of Attendees: ${event.attendees.length}</div>
                            </div>
                        `;
          const infoWindow = new window.google.maps.InfoWindow({
            // content:
            content: infoWindowContent,
            disableAutoPan: true,
            closeBox: false
          });

          marker.addListener("mouseover", () => {
            infoWindow.open(map, marker);
          });
          marker.addListener("mouseout", () => {
            infoWindow.close(map, marker);
          });

          // Attach marker event handlers
          Object.entries(markerEventHandlers).forEach(
            ([eventType, handler]) => {
              marker.addListener(eventType, () => handler(event));
            }
          );

          newMarkers[event._id] = marker;
        } else {
          // If a marker already exists for the event, reuse it
          newMarkers[event._id] = markersRef.current[event._id];
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
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
        if (!newMarkers[id] || (language && events[id].language !== language)) {
          markersRef.current[id].setMap(null);
        }
      });
    }
    // Update the markers ref with the new set of markers
    markersRef.current = newMarkers;
  }, [events, map, mapOptions, language]);

  return (
    <div
      ref={mapRef}
      style={{
        paddingTop: "50px",
        borderRadius: "18px",
        height: "90%",
        width: "70%",
      }}
    >
      Map
    </div>
  );
};

const EventsMapWrapper = ({
  events,
  markerEventHandlers,
  mapOptions,
  language,
}) => {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <EventMap
        events={events}
        markerEventHandlers={markerEventHandlers}
        mapOptions={mapOptions}
        language={language}
      />
    </Wrapper>
  );
};

export default EventsMapWrapper;
