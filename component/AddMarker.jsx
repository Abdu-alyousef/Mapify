import { useState } from 'react';
import { Popup } from 'react-map-gl';

const AddMarker = ({ newPlace,handleClosePopup, onSubmit, userId }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState(1);


 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, desc, rating, userId});
    setTitle('');
    setDesc('');
    setRating(1);
    handleClosePopup();
  };

  return (
    newPlace && (
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
            <input
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Review</label>
            <textarea
              placeholder="Say something about this place."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <label>Rating</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
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
    )
  );
};

export default AddMarker;
