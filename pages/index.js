import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";
import { useState } from "react";

const Home = () => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [popupVisible, setPopupVisible] = useState(false);

  const handleMarkerClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };
  
  return (
    <div>
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          latitude: 51.1657,
          longitude: 10.4515,
          zoom: 4,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={2.294694}
          latitude={48.858093}
          offsetLeft={-20}
          offsetTop={-10} 
        >
          <RoomIcon color="red" />
        </Marker>
        <Marker
          longitude={2.94694}
          latitude={48.858093}
          offsetLeft={-20}
          offsetTop={-10} 
          onClick={handleMarkerClick}
        >
          <RoomIcon color="secondary" />
        </Marker>
        {popupVisible && (
        <Popup
          longitude={2.294694}
          latitude={48.858093}
          onClose={closePopup}
          closeOnClick={false}
        >
          <div>
            <h3>Eiffel Tower</h3>
            <p>This is the Eiffel Tower</p>
          </div>
        </Popup>
             )}
      </Map>
      
    </div>
  );
};

export default Home;
