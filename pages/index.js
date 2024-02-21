import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, Fragment } from "react";
import axios from "axios";
import CustomMarker from "@/component/CustomMarker";
import CustomPopup from "@/component/CustomPopup";
import AddMarker from "@/component/AddMarker";

const Home = ({ markers: initialMarkers }) => {
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  
  const [newPlace, setNewPlace] = useState(null);
  const [markers, setMarkers] = useState(initialMarkers);

  const handleMarkerClick = (markerId) => {
    setCurrentPlaceId(markerId);
    setNewPlace(null);
  };

  const handleClosePopup = () => {
    setNewPlace(null);
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({ lng, lat });
    setCurrentPlaceId(null);
  };

  const handleMarkerSubmit = async (markerData) => {
    const newMarker = {
      name: 'Aboud',
      title: markerData.title,
      desc: markerData.desc,
      rating: markerData.rating,
      latitude: newPlace.lat,
      longitude: newPlace.lng,
    };
    try {
      const Uri = "http://localhost:3000/api/addMarker";
      const res = await axios.post(Uri, newMarker);
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <Register /> */}
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          latitude: 51.1657,
          longitude: 10.4515,
          zoom: 4,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
      >
        {markers.map((marker) => (
          <Fragment>
            <CustomMarker
              key={marker._id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetLeft={-20}
              offsetTop={-10}
              markerId={marker._id}
              onMarkerClick={handleMarkerClick}
            />
            {marker._id === currentPlaceId && (
              <CustomPopup
                longitude={marker.longitude}
                latitude={marker.latitude}
                marker={marker}
              />
            )}
          </Fragment>
        ))}

        {newPlace && (
          <AddMarker
            newPlace={newPlace}
            handleClosePopup={handleClosePopup}
            onSubmit={handleMarkerSubmit}
          />
        )}
      </Map>
    </div>
  );
};

export default Home;

// export async function getServerSideProps() {
//   try {
//     const apiUrl = "http://localhost:3000/api/markers";
//     const response = await axios.get(apiUrl);
//     const markers = response.data;

//     return {
//       props: {
//         markers,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching markers:", error);
//     return {
//       props: {
//         markers: [],
//       },
//     };
//   }
// }
