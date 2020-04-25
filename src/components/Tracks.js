import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'


export default function Tracks(props) {
  const [currentPlayingTrackId, setCurrentPlayingTrackId] = React.useState(null)

  const makeAudioAction = (audioId) => {
    let track = null;
    if (audioId === currentPlayingTrackId) {
      track = document.getElementById(audioId)
      if (track.paused) {
        track.play()
      } else {
        track.pause()
        setCurrentPlayingTrackId(null)
      }
    } else {
      if (currentPlayingTrackId) {
        track = document.getElementById(currentPlayingTrackId)
        track.pause()
        track.currentTime = 0
      }
      track = document.getElementById(audioId)
      track.play()
      setCurrentPlayingTrackId(audioId)
    }
  }

  const tracks = props.tracks.map((track, index) => {
    const audioId = `audio-id-${index}`;
    return (
      <li key={index}>
        <FontAwesomeIcon
          onClick={() => makeAudioAction(audioId)}
          className="track-icon"
          icon={audioId !== currentPlayingTrackId ? faPlay : faPause}
        /> {track.name}
        <audio
          src={track.preview_url}
          id={audioId}
        >
        </audio>
      </li>
    )
  });

  return (
      <div className="tracks">
        <ul>
          {tracks}
        </ul>
        <div style={{ textAlign: "center", margin: "15px 0" }}>
          <FontAwesomeIcon
            icon={faSpotify}
          /> <a target="_blank" href={`https://open.spotify.com/playlist/${props.playlistId}`}>Follow the playlist on Spotify</a>
        </div>
      </div>
  )
}
