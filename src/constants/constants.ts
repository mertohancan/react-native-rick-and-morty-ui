import { Dimensions } from "react-native";

export const window = Dimensions.get("window");

const fixedWidth = 414;

export const calWidth = (size: number) => (size / fixedWidth) * window.width;

export const API_SERVICES = {
  characters: "https://rickandmortyapi.com/api/character",
  locations: "https://rickandmortyapi.com/api/location",
  episodes: "https://rickandmortyapi.com/api/episode",
};
