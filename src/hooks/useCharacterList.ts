import { useEffect, useState } from "react";
import { API_SERVICES } from "src/constants/constants";
import { Characters } from "src/types/characters";

export type Status = "Alive" | "Dead" | "unknown" | "";

export const useCharacterList = () => {
  const [isLoader, setLoader] = useState(false);
  const [hasError, setError] = useState(false);
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Characters[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status>("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoader(true);
        const res = await fetch(`${API_SERVICES.characters}?page=${page}`);
        const data = await res.json();
        const fetchedCharacters = data.results as Characters[];

        if (page === 1) {
          setCharacters(fetchedCharacters);
        } else {
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...fetchedCharacters,
          ]);
        }

        setNextPage(getNextPageNumber(data.info.next));
        setError(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching characters:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchCharacters();
  }, [page]);

  useEffect(() => {
    // Filtreleme işlemleri
    if (nameFilter || statusFilter) {
      const filteredList = characters.filter((character) => {
        const nameMatch = character?.name
          ?.toLowerCase()
          .includes(nameFilter.toLowerCase());
        const statusMatch = character?.status
          ?.toLowerCase()
          .includes(statusFilter.toLowerCase());
        return nameMatch && statusMatch;
      });
      setFilteredCharacters(filteredList);
    } else {
      setFilteredCharacters(characters);
    }
  }, [characters, nameFilter, statusFilter]);

  const getNextPageNumber = (nextUrl: string | null): number | null => {
    if (nextUrl) {
      const urlObj = new URL(nextUrl);
      const nextPageNumber = Number(urlObj.searchParams.get("page"));
      return nextPageNumber;
    }
    return null;
  };

  const loadNextPage = () => {
    if (nextPage !== null) {
      setPage(nextPage);
    }
  };

  return {
    characters: filteredCharacters,
    isLoader,
    hasError,
    loadNextPage,
    nameFilter,
    setNameFilter,
    statusFilter,
    setStatusFilter,
  };
};
