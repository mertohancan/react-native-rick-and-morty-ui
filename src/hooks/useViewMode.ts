import { useState } from "react";

type ViewMode = "list" | "grid";

export const useViewMode = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "grid" : "list"));
  };

  return { viewMode, toggleViewMode, isGrid: viewMode === "grid" };
};
