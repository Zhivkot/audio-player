// App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadComponent from './components/UploadComponent';
import PlayerComponent from './components/PlayerComponent';
import { withAuthenticator } from '@aws-amplify/ui-react';
// import amplify ui css
import "@aws-amplify/ui-react/styles.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/upload">Upload</Link> | <Link to="/player">Player</Link>
      </nav>

      <Routes>
        <Route path="/upload" element={<UploadComponent />} />
        <Route path="/player" element={<PlayerComponent />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);
