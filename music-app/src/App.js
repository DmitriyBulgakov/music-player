import { useState, useRef } from 'react';
// Import Styles
import './styles/app.scss';
// Adding Components
import Song from "./components/song/song";
import Player from "./components/player/player";
import Library from "./components/library/library";
import Nav from './components/nav/nav';
// Import Util
import data from './data';



function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculeted persentage
    const  roundedCurrent = Math.round(current);
    const  roundedDuration = Math.round(duration);
    const  animation = Math.round((roundedCurrent / roundedDuration) * 100);
   
    
        setSongInfo({
          ...songInfo,
          currentTime: current, 
          duration: duration,
          animationPercentage: animation,
        })
}
  // Ref
  const audioRef = useRef(null);

  const songEndHendler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);        
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
            
        
  }
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef} 
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying} 
        currentSong={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs} 
        />
      <Library
        audioRef={audioRef} 
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        currentSong={currentSong}
        libraryStatus={libraryStatus}      
        isPlaying={isPlaying} 
      />
      <audio 
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHendler}
      ></audio>
    </div>
  );
}

export default App;
