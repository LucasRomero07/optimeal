import recipesDB from "../data/recipes";

function formatDate(isoString) {
  if (!isoString) return null;
  return new Date(isoString).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecipeHistory({
  history,
  favoriteRecipeIds,
  onToggleFavoriteRecipe,
  onViewRecipe,
  onGoBack,
}) {
  const favoriteRecipes = recipesDB.filter((r) =>
    favoriteRecipeIds.includes(r.id)
  );

  return (
    <div className="view history-view">
      <header className="header">
        <button className="btn btn-back" onClick={onGoBack}>
          ← Volver
        </button>
        <h1>Historial</h1>
        <p className="subtitle">Recetas recientes y favoritas</p>
      </header>

      <section className="history-section">
        <h3 className="cat-title">⭐ Recetas favoritas</h3>
        {favoriteRecipes.length === 0 ? (
          <p className="empty-msg">Aún no tienes recetas favoritas</p>
        ) : (
          <div className="history-list">
            {favoriteRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="history-item history-item--fav"
                onClick={() => onViewRecipe(recipe.id)}
              >
                <span className="history-emoji">{recipe.emoji}</span>
                <div className="history-info">
                  <span className="history-title">{recipe.title}</span>
                  <span className="history-time">⏱ {recipe.cookTime} min</span>
                </div>
                <button
                  className="pref-toggle pref-toggle--fav pref-toggle--active"
                  onClick={(e) => { e.stopPropagation(); onToggleFavoriteRecipe(recipe.id); }}
                  title="Quitar de favoritos"
                >
                  ⭐
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="history-section">
        <h3 className="cat-title">🕐 Recetas recientes</h3>
        {history.length === 0 ? (
          <p className="empty-msg">Aún no has visitado ninguna receta</p>
        ) : (
          <div className="history-list">
            {history.map((recipe) => {
              const isFav = favoriteRecipeIds.includes(recipe.id);
              return (
                <div
                  key={recipe.id}
                  className={`history-item${isFav ? " history-item--fav" : ""}`}
                  onClick={() => onViewRecipe(recipe.id)}
                >
                  <span className="history-emoji">{recipe.emoji}</span>
                  <div className="history-info">
                    <span className="history-title">{recipe.title}</span>
                    <span className="history-time">⏱ {recipe.cookTime} min</span>
                    {recipe.visitedAt && (
                      <span className="history-date">{formatDate(recipe.visitedAt)}</span>
                    )}
                  </div>
                  <button
                    className={`pref-toggle pref-toggle--fav${isFav ? " pref-toggle--active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); onToggleFavoriteRecipe(recipe.id); }}
                    title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                  >
                    ⭐
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
