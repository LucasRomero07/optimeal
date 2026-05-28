import recipesDB from "../data/recipes";
import { isAllowedByDiet } from "../data/diets";

export function getMealRecommendations(pantry, maxCookTime = 0, userProfile = null, favoriteIngredients = []) {
  const pantryLower = pantry.map((i) => i.toLowerCase().trim());
  const allergies = (userProfile?.allergies || []).map((a) => a.toLowerCase().trim());
  const dislikes = (userProfile?.dislikes || []).map((d) => d.toLowerCase().trim());
  const diet = userProfile?.diet || "omnivore";
  const favoritesLower = (favoriteIngredients || []).map((i) => i.toLowerCase().trim());

  const scored = recipesDB
    .filter((recipe) => {
      if (maxCookTime > 0 && recipe.cookTime > maxCookTime) return false;
      return true;
    })
    .map((recipe) => {
      const allEssentials = recipe.essentials.map((e) => e.toLowerCase());

      const viable = allEssentials.every((essential) => {
        if (pantryLower.includes(essential)) return true;
        const subs = (recipe.substitutes?.[essential] || []).map((s) =>
          s.toLowerCase()
        );
        return subs.some((s) => pantryLower.includes(s));
      });

      if (!viable) return null;

      const allIngredients = [
        ...recipe.essentials,
        ...Object.keys(recipe.substitutes || {}),
      ];
      const uniqueIngredients = [...new Set(allIngredients)];
      let score = 0;
      const details = [];
      let blockedByAllergy = false;
      let blockedByDiet = false;
      let hasDislike = false;

      const titleDesc = (recipe.title + " " + recipe.description).toLowerCase();
      if (dislikes.some((d) => titleDesc.includes(d))) {
        hasDislike = true;
      }

      for (const ideal of uniqueIngredients) {
        const idealL = ideal.toLowerCase();

        if (allergies.length > 0 && allergies.includes(idealL)) {
          blockedByAllergy = true;
        }
        if (!isAllowedByDiet(idealL, diet)) {
          blockedByDiet = true;
        }

        if (pantryLower.includes(idealL)) {
          score += 3;
          details.push({ ingredient: ideal, status: "has" });
        } else {
          const subs = (recipe.substitutes?.[ideal] || []).map((s) =>
            s.toLowerCase()
          );

          const subMatch = subs.find((s) => pantryLower.includes(s));

          const subBlockedByAllergy = subMatch && allergies.includes(subMatch);
          const subBlockedByDiet = subMatch && !isAllowedByDiet(subMatch, diet);

          if (subBlockedByAllergy || subBlockedByDiet) {
            blockedByAllergy = true;
          }

          const safeSub = subs.find((s) => {
            return pantryLower.includes(s) &&
              !allergies.includes(s) &&
              isAllowedByDiet(s, diet);
          });

          if (safeSub) {
            score += 2;
            details.push({
              ingredient: ideal,
              status: "substituted",
              substitutedWith: safeSub,
            });
          } else if (subMatch) {
            score += 2;
            details.push({
              ingredient: ideal,
              status: "substituted",
              substitutedWith: subMatch,
            });
          } else {
            score -= 1;
            details.push({ ingredient: ideal, status: "missing" });
          }
        }
      }

      if (blockedByAllergy) return null;
      if (blockedByDiet) return null;

      if (hasDislike) {
        score -= 5;
      }

      // Bonus for favorite ingredients
      const recipeIngredientsLower = uniqueIngredients.map((i) => i.toLowerCase());
      for (const fav of favoritesLower) {
        if (recipeIngredientsLower.includes(fav)) {
          score += 2;
        }
      }

      let flags = [];
      if (hasDislike) flags.push("⚠️ contiene términos que no te gustan");

      return { ...recipe, score, details, flags };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  return scored;
}
