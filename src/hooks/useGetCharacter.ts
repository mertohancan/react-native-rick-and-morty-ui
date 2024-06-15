import { useEffect, useState } from "react";
import { API_SERVICES } from "src/constants/constants";
import { CharacterDetail } from "src/types/character-detail";

export const useGetCharacter = ({ id }: { id: number }) => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<CharacterDetail>();
  const [lastEpisodeName, setLastEpisodeName] = useState("");

  useEffect(() => {
    const getCharacter = async () => {
      try {
        setLoader(true);
        const response = await fetch(`${API_SERVICES.characters}/${id}`);
        const data = await response.json();
        console.log("data:", data);
        setData(data);
        // Check if character has episodes
        if (data.episode.length > 0) {
          try {
            const lastEpisodeUrl = data.episode[data.episode.length - 1];
            const episodeResponse = await fetch(lastEpisodeUrl);
            const episodeData = await episodeResponse.json();
            setLastEpisodeName(`${episodeData.name} (${episodeData.air_date})`);
          } catch (error) {
            console.log("error:", error);
            setLastEpisodeName(""); // Service error
          }
        } else {
          setLastEpisodeName(""); // No episodes found
        }
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    getCharacter();
  }, [id]);

  return { error, loader, data, lastEpisodeName };
};
