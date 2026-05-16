import recipesDB from "../data/recipes";

export function getMealRecommendations(pantry, maxCookTime = 0) {
  const pantryLower = pantry.map((i) => i.toLowerCase().trim());

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

      for (const ideal of uniqueIngredients) {
        const idealL = ideal.toLowerCase();
        if (pantryLower.includes(idealL)) {
          score += 3;
          details.push({ ingredient: ideal, status: "has" });
        } else {
          const subs = (recipe.substitutes?.[ideal] || []).map((s) =>
            s.toLowerCase()
          );
          const usedSub = subs.find((s) => pantryLower.includes(s));
          if (usedSub) {
            score += 2;
            details.push({
              ingredient: ideal,
              status: "substituted",
              substitutedWith: usedSub,
            });
          } else {
            score -= 1;
            details.push({ ingredient: ideal, status: "missing" });
          }
        }
      }

      return { ...recipe, score, details };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  return scored;
}
