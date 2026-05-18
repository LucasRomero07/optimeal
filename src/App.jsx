import { useState, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getMealRecommendations } from "./hooks/useRecommendations";
import recipesDB from "./data/recipes";
import PantrySelector from "./components/PantrySelector";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import IngredientPreferences from "./components/IngredientPreferences";
import RecipeHistory from "./components/RecipeHistory";
import "./App.css";

const DEFAULT_PANTRY = ["pasta", "tomate", "carne picada", "cebolla", "sal"];

export default function App() {
  const [pantry, setPantry] = useLocalStorage("optimeal_pantry", DEFAULT_PANTRY);
  const [view, setView] = useState("pantry");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailFromView, setDetailFromView] = useState("results");
  const [omittedIds, setOmittedIds] = useLocalStorage("optimeal_omitted", []);
  const [maxCookTime, setMaxCookTime] = useLocalStorage("optimeal_maxCookTime", 0);
  const [blockedIngredients, setBlockedIngredients] = useLocalStorage("optimeal_blocked", []);
  const [favoriteIngredients, setFavoriteIngredients] = useLocalStorage("optimeal_favorites", []);
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useLocalStorage("optimeal_fav_recipes", []);
  const [visitedRecipes, setVisitedRecipes] = useLocalStorage("optimeal_history", []);
  const [settingsReturnView, setSettingsReturnView] = useState("pantry");

  const recommendations = useMemo(
    () => getMealRecommendations(pantry, maxCookTime, favoriteIngredients),
    [pantry, maxCookTime, favoriteIngredients]
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
    setDetailFromView(view);
    setSelectedRecipe(recipe);
    setView("detail");
    setVisitedRecipes((prev) => {
      const filtered = prev.filter((r) => r.id !== recipe.id);
      const entry = { id: recipe.id, title: recipe.title, emoji: recipe.emoji, cookTime: recipe.cookTime, visitedAt: new Date().toISOString() };
      return [entry, ...filtered].slice(0, 20);
    });
  };

  const handleViewFromHistory = (id) => {
    const fromRecs = recommendations.find((r) => r.id === id);
    if (fromRecs) {
      handleViewDetail(fromRecs);
      return;
    }
    const fromDB = recipesDB.find((r) => r.id === id);
    if (fromDB) {
      handleViewDetail({ ...fromDB, score: 0, details: [] });
    }
  };

  const handleGoBack = () => {
    if (view === "detail") {
      setView(detailFromView);
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

  const handleOpenSettings = () => {
    setSettingsReturnView(view);
    setView("settings");
  };

  const handleCloseSettings = () => {
    setView(settingsReturnView);
  };

  const handleOpenHistory = () => {
    setSettingsReturnView(view);
    setView("history");
  };

  const handleCloseHistory = () => {
    setView(settingsReturnView);
  };

  const handleToggleBlocked = (name) => {
    if (blockedIngredients.includes(name)) {
      setBlockedIngredients(blockedIngredients.filter((i) => i !== name));
    } else {
      setBlockedIngredients([...blockedIngredients, name]);
      if (pantry.includes(name)) {
        setPantry(pantry.filter((i) => i !== name));
      }
    }
  };

  const handleToggleFavorite = (name) => {
    if (favoriteIngredients.includes(name)) {
      setFavoriteIngredients(favoriteIngredients.filter((i) => i !== name));
    } else {
      setFavoriteIngredients([...favoriteIngredients, name]);
    }
  };

  const handleToggleFavoriteRecipe = (id) => {
    if (favoriteRecipeIds.includes(id)) {
      setFavoriteRecipeIds(favoriteRecipeIds.filter((i) => i !== id));
    } else {
      setFavoriteRecipeIds([...favoriteRecipeIds, id]);
    }
  };

  if (view === "history") {
    return (
      <RecipeHistory
        history={visitedRecipes}
        favoriteRecipeIds={favoriteRecipeIds}
        onToggleFavoriteRecipe={handleToggleFavoriteRecipe}
        onViewRecipe={handleViewFromHistory}
        onGoBack={handleCloseHistory}
      />
    );
  }

  if (view === "settings") {
    return (
      <IngredientPreferences
        blocked={blockedIngredients}
        favorites={favoriteIngredients}
        onToggleBlocked={handleToggleBlocked}
        onToggleFavorite={handleToggleFavorite}
        onGoBack={handleCloseSettings}
      />
    );
  }

  if (view === "results") {
    return (
      <RecipeList
        recommendations={visibleRecipes}
        onViewDetail={handleViewDetail}
        onGoBack={handleGoBack}
        onOpenSettings={handleOpenSettings}
        onOpenHistory={handleOpenHistory}
        favoriteIngredients={favoriteIngredients}
        favoriteRecipeIds={favoriteRecipeIds}
        onToggleFavoriteRecipe={handleToggleFavoriteRecipe}
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
      onOpenSettings={handleOpenSettings}
      onOpenHistory={handleOpenHistory}
      blockedIngredients={blockedIngredients}
      favoriteIngredients={favoriteIngredients}
    />
  );
}

