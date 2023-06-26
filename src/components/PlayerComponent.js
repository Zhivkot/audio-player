import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';

function PlayerComponent() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioUrls, setAudioUrls] = useState([]);

  const loadPlaylist = async () => {
    try {
      const { results } = await Storage.list('', { level: 'private' }); // Specify access level as 'private'

      setPlaylist(results);

      const audioUrlPromises = results.map(async (audio) => {
        if (audio.key) {
          try {
            const url = await Storage.get(audio.key, { level: 'private' });
            return { key: audio.key, url };
          } catch (error) {
            console.error('Error fetching audio:', error);
            return null;
          }
        }
        return null;
      });

      const audioUrls = await Promise.all(audioUrlPromises);
      setAudioUrls(audioUrls.filter((audio) => audio !== null));
    } catch (error) {
      console.log('Error retrieving playlist:', error);
    }
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
  };

  return (
    <div>
      <h1>Audio Player</h1>
      <div className="playlist">
        {playlist.map((audio, index) => (
          <div
            key={audio.key}
            className={`track ${index === currentTrackIndex ? 'active' : ''}`}
            onClick={() => handlePlay(index)}
          >
            {audio.key}
          </div>
        ))}
      </div>
      {audioUrls.length > 0 && (
        <div className="audio-player">
          <audio src={audioUrls[currentTrackIndex].url} controls autoPlay />
        </div>
      )}
    </div>
  );
}

export default PlayerComponent;
