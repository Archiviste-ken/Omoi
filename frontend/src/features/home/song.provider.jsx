import { useState } from "react";
import { SongContext } from "./song.context";

export const SongProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/n2inecbgg/cohort-2/moodify/songs/Rounds_N_Ring__RiskyjaTT.CoM__Kcd7umnhZ.mp3",
    posterUrl:
      "https://ik.imagekit.io/n2inecbgg/cohort-2/moodify/posters/Rounds_N_Ring__RiskyjaTT.CoM__8vLQDreJpF.jpeg",
    title: "Rounds N Ring (RiskyjaTT.CoM)",
    mood: "happy",
  });

  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
};
