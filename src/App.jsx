import { useState, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useUserProfile } from "./hooks/useUserProfile";
import { getMealRecommendations } from "./hooks/useRecommendations";
import PantrySelector from "./components/PantrySelector";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import LoginScreen from "./components/LoginScreen";
import ProfileSettings from "./components/ProfileSettings";
import "./App.css";

const DEFAULT_PANTRY = ["pasta", "tomate", "carne picada", "cebolla", "sal"];

export default function App() {
  const [profile, setProfile] = useUserProfile();
  const [pantry, setPantry] = useLocalStorage("optimeal_pantry", DEFAULT_PANTRY);
  const [view, setView] = useState(profile.name ? "pantry" : "login");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [omittedIds, setOmittedIds] = useLocalStorage("optimeal_omitted", []);
  const [maxCookTime, setMaxCookTime] = useLocalStorage("optimeal_maxCookTime", 0);
  const [ratings, setRatings] = useLocalStorage("optimeal_ratings", {});

  const recommendations = useMemo(
    () => getMealRecommendations(pantry, maxCookTime, profile),
    [pantry, maxCookTime, profile]
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
    } else if (view === "profile") {
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

  if (view === "results") {
    return (
      <RecipeList
        recommendations={visibleRecipes}
        onViewDetail={handleViewDetail}
        onGoBack={handleGoBack}
        ratings={ratings}
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
      profile={profile}
    />
  );
}
