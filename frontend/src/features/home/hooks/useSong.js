import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

const normalizeMood = (mood) =>
  mood
    ?.toString()
    .toLowerCase()
    .match(/[a-z]+/)?.[0] || mood;

export const useSong = () => {
  const context = useContext(SongContext);

  const { loading, setLoading, song, setSong } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);
    try {
      const data = await getSong({ mood: normalizeMood(mood) });
      setSong(data.song);
    } finally {
      setLoading(false);
    }
  }

  return { loading, song, handleGetSong };
};
