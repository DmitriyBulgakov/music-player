
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';


const Player = ({
    audioRef, 
    currentSong, 
    isPlaying, 
    setIsPlaying,
    songInfo, 
    setSongInfo, 
    songs, 
    setCurrentSong,
    setSongs
}) => {
    //  UseEffect
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
    },[currentSong])
    // Event Handler
    const playSongHandler = () => {
        if(isPlaying ) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
   
    const getTime = (t) => {
        return(
            Math.floor(t / 60) + ":" + ("0" + Math.floor(t % 60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }
    const skipTrackHandler = async (diraction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(diraction === 'skip-forward') {
        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
            
        }
        if(diraction === 'skip-back') {
            if((currentIndex -1) % songs.length === -1) {
            await setCurrentSong(songs[songs.length -1]);
                if(isPlaying) audioRef.current.play();               
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);         
           
        }
        if(isPlaying) audioRef.current.play();
    };
    // Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }  
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)} </p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime}
                    onChange = {dragHandler} 
                    type="range" 
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration): '0:00'}</p>                
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-back')}
                    className = 'skip-back'
                    size='2x' 
                    icon = {faAngleLeft} 
                />
                <FontAwesomeIcon 
                    onClick = {playSongHandler} 
                    className = 'play'
                    size='2x' 
                    icon = {isPlaying ? faPause : faPlay} 
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-forward')} 
                    className = 'skip-forward' 
                    size='2x' 
                    icon = {faAngleRight} 
                />
            </div>
            
        </div>
    )
}

export default Player;