import { Marker } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';

const CustomMarker = ({ longitude, latitude, offsetLeft, offsetTop, markerId, onMarkerClick }) => {

  

  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      offsetLeft={offsetLeft}
      offsetTop={offsetTop}
    >
      <RoomIcon
        color="secondary"
        onClick={() => onMarkerClick(markerId)}
      />
    </Marker>
  );
};

export default CustomMarker;