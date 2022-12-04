import React, { useState, useRef } from 'react';
import Song from './components/Song';
import Player from './components/Player';
import data from './util';
import './styles/app.scss';
import Library from './components/Library';

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0 });

  // event handler time 
  const handleTimeUpdate = (event) => {
    const current = event.target.currentTime;
    const duration = event.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration })
  }

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>

  );
}

export default App;
