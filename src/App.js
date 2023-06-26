import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadComponent from './components/UploadComponent';
import PlayerComponent from './components/PlayerComponent';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './App.css'; // Import custom CSS file for styling

function App() {
  return (
    <div className="app-container">
      <Router>
        {/* <nav className="navbar">
          <Link to="/upload" className="nav-link">Upload</Link>
          <span className="nav-separator">|</span>
          <Link to="/player" className="nav-link">Player</Link>
        </nav> */}

        <div className="content">
          <Routes>
            <Route path="/upload" element={<UploadComponent />} />
            <Route path="/" element={<PlayerComponent />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
