import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";
import { useState, Fragment} from "react";
import { Star } from "@mui/icons-material";
import axios from "axios";

const Home = ({ markers }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const currentUser = 'Abdu';
  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null)
  const [rating, setRating] = useState(0)

  console.log(markers)

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      lng,
      lat
    });
  };

  const handleClosePopup = () => {
    setNewPlace(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMarker = {
      name: currentUser,
      title,
      desc,
      rating,
      latitude: newPlace.lat,
      longitude: newPlace.lng
    }
    try{
      const Uri = 'http://localhost:3000/api/addMarker'
      const res = await axios.post(Uri, newMarker)
      setNewPlace(null)
    }catch(err){
      console.log(err)
    }
  }

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
        onDblClick={handleAddClick}
      >
        {markers.map((marker) => (
          <Fragment>
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetLeft={-20}
              offsetTop={-10}

            >
              <RoomIcon
                color="secondary"
                onClick={() => handleMarkerClick(marker._id)}
              />
            </Marker>
            {marker._id === currentPlaceId && (
              <Popup
                longitude={marker.longitude}
                latitude={marker.latitude}
                closeOnClick={false}
              >
                <div className="card">
                  <label>Place</label>
                  <h4>Eiffel tower</h4>
                  <label>Review</label>
                  <p className="review">Beutiful place. I like it.</p>
                  <label>Rating</label>
                  <div className="stars">
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by: <b>Abdu</b>
                  </span>
                  <span className="date">1 hour ago</span>
                </div>
              </Popup>
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
            <div>
              <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)}/>
              <label>Review</label>
              <textarea placeholder="Say us something about this place." onChange={(e) => setDesc(e.target.value)} />
              <label>Rating</label>
              <select  onChange={(e) => setRating(e.target.value)}>
                <option value= '1'>1</option>
                <option value= '2'>2</option>
                <option value= '3'>3</option>
                <option value= '4'>4</option>
                <option value= '5'>5</option>
              </select>
              <button className="btn" type="submit">Add Marker</button>
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
    const apiUrl = "http://localhost:3000/api/markers"; // Adjust URL as needed
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
