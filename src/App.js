import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadComponent from './components/UploadComponent';
import PlayerComponent from './components/PlayerComponent';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './App.css'; // Import custom CSS file for styling
import MarkerEditor from './components/MarkerEditor';

function App() {

  const handleSaveMarker = (markerData) => {
    // Handle saving the marker data to the audio file
    // You can use Amplify Storage or any other method you prefer to update the ID3 tags of the audio file with the new marker data
    console.log('Marker data:', markerData);
  };
  return (
    <div className="app-container">
      <Router>
        {/* <nav className="navbar">
          <Link to="/upload" className="nav-link">Upload</Link>
          <span className="nav-separator">|</span>
          <Link to="/player" className="nav-link">Player</Link>
          <span className="nav-separator">|</span>
          <Link to="/editor" className="nav-link">Marker</Link>
        </nav> */}

        <div className="content">
          <Routes>
            <Route path="/upload" element={<UploadComponent />} />
            <Route path="/" element={<PlayerComponent />} />
            <Route path="/editor" element={<MarkerEditor />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
