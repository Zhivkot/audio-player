import React, { useState } from 'react';

function MarkerEditor() {
  const [markers, setMarkers] = useState([]);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const saveMarker = () => {
    if (title && startTime && endTime) {
      const newMarker = { title, startTime, endTime };
      console.log('Saving marker:', newMarker);
      setMarkers([...markers, newMarker]);
      setTitle('');
      setStartTime('');
      setEndTime('');
    }
  };

  const removeMarker = (marker) => {
    const updatedMarkers = markers.filter((m) => m !== marker);
    console.log('Removing marker:', marker);
    setMarkers(updatedMarkers);
  };

  return (
    <div>
      {/* Marker Editor UI */}
      {/* ... */}
    </div>
  );
}

export default MarkerEditor;
