import React, { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../song.context";
import "./Player.scss";

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5];

const formatTime = (value = 0) => {
  const safeValue = Number.isFinite(value) ? value : 0;
  const minutes = Math.floor(safeValue / 60);
  const seconds = Math.floor(safeValue % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Player = () => {
  const { song, loading } = useContext(SongContext);
  const audioRef = useRef(null);
  const hasMountedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    if (hasMountedRef.current && song?.url) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      hasMountedRef.current = true;
    }
  }, [song?.url]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.playbackRate = speed;
    }
  }, [speed]);

  const seekBy = (seconds) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextTime = clamp(
      audio.currentTime + seconds,
      0,
      audio.duration || duration || 0,
    );
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);

    if (audio) {
      audio.currentTime = nextTime;
    }

    setCurrentTime(nextTime);
  };

  const trackTitle = song?.title || "Waiting for your next mood";
  const posterUrl =
    song?.posterUrl ||
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80";
  const moodLabel = song?.mood || "unknown";

  return (
    <section className="player-shell" aria-label="Music player">
      <div className="player-card">
        <div className="player-art">
          <img src={posterUrl} alt={trackTitle} />
          <div className="player-art__overlay">
            <span>{loading ? "Loading track" : "Now playing"}</span>
            <strong>{moodLabel}</strong>
          </div>
        </div>

        <div className="player-content">
          <div className="player-header">
            <div>
              <p className="player-kicker">Moodify Player</p>
              <h2>{trackTitle}</h2>
              <span className="player-subtitle">
                {loading ? "Curating a fresh track..." : "Polished playback controls for the selected vibe."}
              </span>
            </div>

            <span className="player-badge">{speed.toFixed(2)}x speed</span>
          </div>

          <div className="player-progress">
            <div className="player-progress__row">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.01"
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek track"
            />
          </div>

          <div className="player-controls">
            <button type="button" onClick={() => seekBy(-5)}>
              -5 sec
            </button>
            <button
              type="button"
              className="player-controls__primary"
              onClick={togglePlay}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button type="button" onClick={() => seekBy(5)}>
              +5 sec
            </button>
          </div>

          <div className="player-speeds">
            {SPEED_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={option === speed ? "is-active" : ""}
                onClick={() => setSpeed(option)}
              >
                {option.toFixed(2)}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song?.url}
        preload="metadata"
        onLoadedMetadata={() => {
          const audio = audioRef.current;

          if (!audio) {
            return;
          }

          setDuration(audio.duration || 0);
          setCurrentTime(audio.currentTime || 0);
          audio.playbackRate = speed;
        }}
        onTimeUpdate={() => {
          const audio = audioRef.current;

          if (audio) {
            setCurrentTime(audio.currentTime);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />
    </section>
  );
};

export default Player;
