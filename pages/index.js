import Map, {Popup} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, Fragment } from "react";
import axios from "axios";
import CustomMarker from "@/component/CustomMarker";
import CustomPopup from "@/component/CustomPopup";
// import LoginPage from "@/component/LoginPage";
import { useAuth } from "@/component/AuthContext";


const Home = ({ markers }) => {
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState(1);

  const {userId } = useAuth();
  const {username} = useAuth();




const handleAddClick = (e) => {
  const { lng, lat } = e.lngLat;
    setNewPlace({ lng, lat });
    setCurrentPlaceId(null);
  
  };
  const handleMarkerClick = (markerId) => {
    setCurrentPlaceId(markerId);
    setNewPlace(null);
  };

  const handleClosePopup = () => {
    setCurrentPlaceId(null);
    setNewPlace(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const newMarker = {
      name: username, 
      userId: userId,
      title,
      desc,
      rating,
      latitude: newPlace.lat,
      longitude: newPlace.lng,
    };
    console.log(newMarker);
    try {
      const Uri = "http://localhost:3000/api/addMarker";
      const res = await axios.post(Uri, newMarker);
      window.location.reload();
    } catch (err) {
      console.error("Error adding marker:", err);
    }
  };


  return (
    <div className="map">
      {/* <LoginPage /> */}
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
       {markers
          .filter((marker) => marker.userId === userId) // Filter markers by user ID
          .map((marker) => (
            <Fragment key={marker._id}>
              <CustomMarker
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
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            onClose={handleClosePopup}
          >
            <div className="card">
              <form className="form" onSubmit={handleSubmit}>
                <label className="label">Title</label>
                <input className="input"
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="label">Review</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label className="label">Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="btn" type="submit">
                  Add Marker
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const apiUrl = "http://localhost:3000/api/markers";
    const response = await axios.get(apiUrl);
    const markers = response.data;

    return {
      props: {
        markers,
      },
    };
  } catch (error) {
    console.error("Error fetching markers:", error);
    return {
      props: {
        markers: [],
      },
    };
  }
}
