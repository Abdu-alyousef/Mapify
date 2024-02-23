import { Popup } from 'react-map-gl';
import Star from '@mui/icons-material/Star';
import {format} from 'timeago.js'
import classes from '@/component/customPopup.module.css'

const CustomPopup = ({ longitude, latitude, marker, onClose }) => {
  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      closeOnClick={false}
      onClose={onClose}
    >
      <div className={classes.card}>
        <label className={classes.card_label}>Place</label>
        <h4>{marker.title}</h4>
        <label className={classes.card_label}>Review</label>
        <p className={classes.review}>{marker.desc}</p>
        <label className={classes.card_label}>Rating</label>
        <div className="stars">
          {Array(marker.rating).fill(<Star className={classes.star} />)}
        </div>
        <label>Information</label>
        <span className={classes.username}>
          Created by: <b>{marker.name}</b>
        </span>
        <span className={classes.card_date}>{format(marker.createdAt)}</span>
      </div>
    </Popup>
  );
};

export default CustomPopup;