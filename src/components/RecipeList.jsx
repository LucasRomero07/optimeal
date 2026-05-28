import { getEmoji } from "../data/ingredients";

export default function RecipeList({
  recommendations,
  onViewDetail,
  onGoBack,
  ratings,
  onOpenSettings,
  onOpenHistory,
  favoriteIngredients = [],
  favoriteRecipeIds = [],
  onToggleFavoriteRecipe,
}) {
  return (
    <div className="view results-view">
      <header className="header">
        <button className="btn btn-back" onClick={onGoBack}>
          ← Volver
        </button>
        <h1>Recomendaciones</h1>
        <p className="subtitle">
          {recommendations.length} receta{recommendations.length !== 1 ? "s" : ""}{" "}
          viable{recommendations.length !== 1 ? "s" : ""}
        </p>
        <button className="btn-header-icon btn-header-icon--left" onClick={onOpenHistory} title="Historial">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
        </button>
        <button className="btn-header-icon btn-header-icon--right" onClick={onOpenSettings} title="Preferencias">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.3.07-.62.07-.94s-.03-.64-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07 1l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/></svg>
        </button>
      </header>

      <div className="card-list">
        {recommendations.map((recipe) => {
          const isFavRecipe = favoriteRecipeIds.includes(recipe.id);
          const vote = ratings?.[recipe.id];
          const imgSrc = isFavRecipe
            ? recipe.image.replace("/D2691E/FFFDD0", "/FFDD00/5a4a00")
            : recipe.image;
          return (
            <div key={recipe.id} className={`card${isFavRecipe ? " card--fav" : ""}`}>
              <div className="card-img-wrapper">
                <img
                  src={imgSrc}
                  alt={recipe.title}
                  className="card-img"
                />
                <button
                  className={`btn-fav-recipe${isFavRecipe ? " btn-fav-recipe--on" : ""}`}
                  onClick={() => onToggleFavoriteRecipe(recipe.id)}
                  title={isFavRecipe ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                  {isFavRecipe ? "★" : "☆"}
                </button>
              </div>
              <div className="card-body">
                <h2 className="card-title">
                  {recipe.emoji} {recipe.title}
                </h2>
                <span className="card-time">⏱ {recipe.cookTime} min</span>
                <span className="card-score">
                  Puntuación de Despensa: {recipe.score}
                </span>

                {vote && (
                  <span className={`vote-badge ${vote}`}>
                    {vote === "like" ? "👍 Te gustó" : "👎 No te gustó"}
                  </span>
                )}

                {recipe.flags?.length > 0 && (
                  <div className="recipe-flags">
                    {recipe.flags.map((f, i) => (
                      <span key={i} className="flag">{f}</span>
                    ))}
                  </div>
                )}

                <ul className="ingredient-status">
                  {recipe.details.map((d, i) => {
                    if (d.status === "has") {
                      return (
                        <li key={i} className="status-ok">
                          ✅ {getEmoji(d.ingredient)} {d.ingredient}
                          {favoriteIngredients.includes(d.ingredient) && " ⭐"}
                        </li>
                      );
                    }
                    if (d.status === "substituted") {
                      return (
                        <li key={i} className="status-sub">
                          🔄 {getEmoji(d.substitutedWith)} Usando{" "}
                          <strong>{d.substitutedWith}</strong> en lugar de{" "}
                          {getEmoji(d.ingredient)} {d.ingredient}
                        </li>
                      );
                    }
                    return (
                      <li key={i} className="status-missing">
                        ❌ {getEmoji(d.ingredient)} {d.ingredient}
                      </li>
                    );
                  })}
                </ul>

                <div className="card-actions">
                  <button
                    className={`btn btn-primary${isFavRecipe ? " btn-primary--fav" : ""}`}
                    onClick={() => onViewDetail(recipe)}
                  >
                    Ver Receta Completa
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
