import React from "react";
import FaceExpression from "../../Expression/components/FaceExpresson";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import heroImage from "../../../assets/hero.png";
import "./Home.scss";

const Home = () => {
  const { handleGetSong, song, loading } = useSong();

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <span className="home-hero__eyebrow">Moodify experience</span>
          <h1>Detect a vibe, then turn it into a premium listening moment.</h1>
          <p>
            Moodify pairs live expression detection with a polished music
            player, so every session feels tailored, calm, and high-end.
          </p>

          <div className="home-hero__stats">
            <article>
              <strong>{song?.mood || "Ready"}</strong>
              <span>Current mood</span>
            </article>
            <article>
              <strong>{loading ? "Fetching" : "Live"}</strong>
              <span>Song engine</span>
            </article>
            
          </div>
        </div>

        <div className="home-hero__visual">
          <img src={heroImage} alt="Moodify visual preview" />
          <div className="home-hero__floating home-hero__floating--top">
            <span>Expression AI</span>
            <strong>Realtime capture</strong>
          </div>
          <div className="home-hero__floating home-hero__floating--bottom">
            <span>Curated flow</span>
            <strong>Music matched to your face</strong>
          </div>
        </div>
      </section>

      <section className="home-grid">
        <FaceExpression
          onClick={(expression) => {
            handleGetSong({ mood: expression });
          }}
        />
        <Player />
      </section>
    </main>
  );
};

export default Home
