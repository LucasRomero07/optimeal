import { useState, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getMealRecommendations } from "./hooks/useRecommendations";
import PantrySelector from "./components/PantrySelector";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import "./App.css";

const DEFAULT_PANTRY = ["pasta", "tomate", "carne picada", "cebolla", "sal"];

export default function App() {
  const [pantry, setPantry] = useLocalStorage("optimeal_pantry", DEFAULT_PANTRY);
  const [view, setView] = useState("pantry");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [omittedIds, setOmittedIds] = useLocalStorage("optimeal_omitted", []);
  const [maxCookTime, setMaxCookTime] = useLocalStorage("optimeal_maxCookTime", 0);

  const recommendations = useMemo(
    () => getMealRecommendations(pantry, maxCookTime),
    [pantry, maxCookTime]
  );

  const visibleRecipes = useMemo(
    () => recommendations.filter((r) => !omittedIds.includes(r.id)),
    [recommendations, omittedIds]
  );

  const handleHungry = () => {
    if (pantry.length === 0) return;
    setView("results");
  };

  const handleViewDetail = (recipe) => {
    setSelectedRecipe(recipe);
    setView("detail");
  };

  const handleGoBack = () => {
    if (view === "detail") {
      setView("results");
      setSelectedRecipe(null);
    } else {
      setView("pantry");
    }
  };

  const handleOmit = (id) => {
    if (!omittedIds.includes(id)) {
      setOmittedIds([...omittedIds, id]);
    }
    setView("results");
    setSelectedRecipe(null);
  };

  if (view === "results") {
    return (
      <RecipeList
        recommendations={visibleRecipes}
        onViewDetail={handleViewDetail}
        onGoBack={handleGoBack}
      />
    );
  }

  if (view === "detail") {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onGoBack={handleGoBack}
        onOmit={handleOmit}
      />
    );
  }

  return (
    <PantrySelector
      pantry={pantry}
      setPantry={setPantry}
      maxCookTime={maxCookTime}
      setMaxCookTime={setMaxCookTime}
      onHungry={handleHungry}
    />
  );
}
