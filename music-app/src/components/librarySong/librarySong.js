import { useEffect } from "react";


const LibrarySong = ({
    song,
    songs, 
    setCurrentSong,     
    audioRef, 
    setSongs,
    currentSong,
    isPlaying,
}) => {
    const songSelectHandler = async () => {        
        await setCurrentSong(song);
        audioRef.current.play();
        
    }
    
    useEffect(() => {
       // Add Active State       
       const newSongs = songs.map((song) => {
        if (song.id === currentSong.id) {
            return {
                ...song, 
                active: true,
            };
        } else {
            return { 
                ...song,
                active: false,
            }
        }
    });
    setSongs(newSongs)
        if(isPlaying) audioRef.current.play(); 
    },[currentSong])



    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : "" }`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
            <h2>{song.name}</h2>
            <h3>{song.artist}</h3>
            </div>
        </div>
    )
}

export default LibrarySong; 