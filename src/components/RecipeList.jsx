import { getEmoji } from "../data/ingredients";

export default function RecipeList({ recommendations, onViewDetail, onGoBack, ratings }) {
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
      </header>

      <div className="card-list">
        {recommendations.map((recipe) => {
          const vote = ratings?.[recipe.id];
          return (
            <div key={recipe.id} className="card">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img"
              />
              <div className="card-body">
                <h2 className="card-title">{recipe.emoji} {recipe.title}</h2>
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
                    className="btn btn-primary"
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
