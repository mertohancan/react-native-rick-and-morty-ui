import { Characters } from "src/types/characters";

export type Favorites = Pick<Characters, "id" | "name" | "image">;

export interface FavoritesContextProps {
  favorites: Favorites[];
  addFavorite: (id: Favorites) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}
