import LibrarySong from "../librarySong/librarySong";

const Library = ({
    songs, 
    setCurrentSong, 
    audioRef, 
    setSongs, 
    currentSong, 
    libraryStatus,
    isPlaying,
    
}) => {
    return (
        <div className= {`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                    <LibrarySong
                        songs ={songs}
                        setCurrentSong={setCurrentSong} 
                        song = {song}                    
                        key={song.id}
                        audioRef={audioRef}
                        setSongs={setSongs}
                        currentSong={currentSong}
                        isPlaying={isPlaying}
                        
                        
                    />)}
            </div>
        </div>
    )
}

export default Library;