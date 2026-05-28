import { useState, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useUserProfile } from "./hooks/useUserProfile";
import { getMealRecommendations } from "./hooks/useRecommendations";
import recipesDB from "./data/recipes";
import PantrySelector from "./components/PantrySelector";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import LoginScreen from "./components/LoginScreen";
import ProfileSettings from "./components/ProfileSettings";
import IngredientPreferences from "./components/IngredientPreferences";
import RecipeHistory from "./components/RecipeHistory";
import "./App.css";

const DEFAULT_PANTRY = ["pasta", "tomate", "carne picada", "cebolla", "sal"];

export default function App() {
  const [profile, setProfile] = useUserProfile();
  const [pantry, setPantry] = useLocalStorage("optimeal_pantry", DEFAULT_PANTRY);
  const [view, setView] = useState(profile.name ? "pantry" : "login");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailFromView, setDetailFromView] = useState("results");
  const [omittedIds, setOmittedIds] = useLocalStorage("optimeal_omitted", []);
  const [maxCookTime, setMaxCookTime] = useLocalStorage("optimeal_maxCookTime", 0);
  const [ratings, setRatings] = useLocalStorage("optimeal_ratings", {});
  const [blockedIngredients, setBlockedIngredients] = useLocalStorage("optimeal_blocked", []);
  const [favoriteIngredients, setFavoriteIngredients] = useLocalStorage("optimeal_favorites", []);
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useLocalStorage("optimeal_fav_recipes", []);
  const [visitedRecipes, setVisitedRecipes] = useLocalStorage("optimeal_history", []);

  const recommendations = useMemo(
    () => getMealRecommendations(pantry, maxCookTime, profile, favoriteIngredients),
    [pantry, maxCookTime, profile, favoriteIngredients]
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
    } else if (view === "profile" || view === "settings" || view === "history") {
      setView("pantry");
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

  const handleRate = (id, vote) => {
    setRatings({ ...ratings, [id]: vote });
  };

  const handleLogin = () => {
    setView("pantry");
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

  if (view === "login") {
    return (
      <LoginScreen profile={profile} setProfile={setProfile} onStart={handleLogin} />
    );
  }

  if (view === "profile") {
    return (
      <ProfileSettings profile={profile} setProfile={setProfile} onClose={handleGoBack} />
    );
  }

  if (view === "history") {
    return (
      <RecipeHistory
        history={visitedRecipes}
        favoriteRecipeIds={favoriteRecipeIds}
        onToggleFavoriteRecipe={handleToggleFavoriteRecipe}
        onViewRecipe={handleViewFromHistory}
        onGoBack={handleGoBack}
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
        onGoBack={handleGoBack}
      />
    );
  }

  if (view === "results") {
    return (
      <RecipeList
        recommendations={visibleRecipes}
        onViewDetail={handleViewDetail}
        onGoBack={handleGoBack}
        ratings={ratings}
        onOpenSettings={() => setView("settings")}
        onOpenHistory={() => setView("history")}
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
        onRate={handleRate}
        rating={ratings[selectedRecipe?.id]}
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
      onProfile={() => setView("profile")}
      onOpenSettings={() => setView("settings")}
      onOpenHistory={() => setView("history")}
      profile={profile}
      blockedIngredients={blockedIngredients}
      favoriteIngredients={favoriteIngredients}
    />
  );
}
