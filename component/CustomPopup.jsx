import { Popup } from 'react-map-gl';
import Star from '@mui/icons-material/Star';
import {format} from 'timeago.js'

const CustomPopup = ({ longitude, latitude, marker, onClose }) => {
  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      closeOnClick={false}
      onClose={onClose}
    >
      <div className="card">
        <label>Place</label>
        <h4>{marker.title}</h4>
        <label>Review</label>
        <p className="review">{marker.desc}</p>
        <label>Rating</label>
        <div className="stars">
          {Array(marker.rating).fill(<Star className="star" />)}
        </div>
        <label>Information</label>
        <span className="username">
          Created by: <b>{marker.name}</b>
        </span>
        <span className="date">{format(marker.createdAt)}</span>
      </div>
    </Popup>
  );
};

export default CustomPopup;