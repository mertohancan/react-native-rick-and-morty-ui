import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoritesContextProps, Favorites } from "./types";

const FAVORITES_KEY = "favorite_characters";

export const FavoritesContext = createContext<
  FavoritesContextProps | undefined
>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorites[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  const saveFavorites = async (updatedFavorites: Favorites[]) => {
    try {
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  };

  const addFavorite = (character: Favorites) => {
    const updatedFavorites = [...favorites, character];
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
