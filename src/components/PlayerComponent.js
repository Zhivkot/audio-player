import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import './PlayerComponent.css'; // Import custom CSS file for styling

function PlayerComponent() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioUrls, setAudioUrls] = useState([]);
  const [chapters, setChapters] = useState([]);

  const loadPlaylist = async () => {
    try {
      const { results } = await Storage.list('', { level: 'private' });

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

  const getAudioName = (key) => {
    const fileName = key.split('/').pop(); // Get the file name from the key
    const nameWithoutExtension = fileName.replace('.mp3', ''); // Remove the .mp3 extension
    return nameWithoutExtension;
  };

  const handleTimeUpdate = (event) => {
    const currentTime = event.target.currentTime;

    // Check if the currentTime falls within any chapter time intervals
    const selectedChapter = chapters.find((chapter) => currentTime >= chapter.start && currentTime <= chapter.end);

    // Update the selected chapter if found
    if (selectedChapter) {
      // Perform the desired action for the selected chapter (e.g., update UI, trigger event)
      console.log('Selected chapter:', selectedChapter);
    }
  };

  const loadChapters = () => {
    // Replace with your logic to retrieve chapter data associated with the audio file
    const dummyChapters = [
      { start: 0, end: 30, title: 'Chapter 1' },
      { start: 31, end: 60, title: 'Chapter 2' },
      { start: 61, end: 90, title: 'Chapter 3' },
    ];

    setChapters(dummyChapters);
  };

  useEffect(() => {
    loadChapters();
  }, []);

  return (
    <div className="player-container">
      <h1 className="player-title">Audiobooks</h1>
      <div className="playlist-container">
        {playlist.map((audio, index) => (
          <div
            key={audio.key}
            className={`track ${index === currentTrackIndex ? 'active' : ''}`}
            onClick={() => handlePlay(index)}
          >
            {getAudioName(audio.key)}
          </div>
        ))}
      </div>
      {audioUrls.length > 0 && (
        <div className="audio-player">
          <audio src={audioUrls[currentTrackIndex].url} controls onTimeUpdate={handleTimeUpdate} />
        </div>
      )}
    </div>
  );
}

export default PlayerComponent;
