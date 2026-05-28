import { getEmoji } from "../data/ingredients";

export default function RecipeDetail({ recipe, onGoBack, onOmit, onRate, rating }) {
  if (!recipe) return null;

  const handleOmit = () => {
    if (window.confirm("¿Omitir esta receta de las recomendaciones?")) {
      onOmit(recipe.id);
    }
  };

  return (
    <div className="view detail-view">
      <header className="header">
        <button className="btn btn-back" onClick={onGoBack}>
          ← Volver
        </button>
        <h1>{recipe.emoji} {recipe.title}</h1>
      </header>

      <div className="detail-panel">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="detail-img"
        />
        <span className="card-time detail-time">⏱ {recipe.cookTime} min</span>
        <span className="card-score detail-score">
          Puntuación: {recipe.score}
        </span>

        <div className="detail-description">
          {recipe.description.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null;
            return <p key={i}>{trimmed}</p>;
          })}
        </div>

        <div className="detail-ingredients">
          <h3>🧾 Ingredientes</h3>
          <ul>
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
        </div>

        <div className="rating-section">
          <p className="rating-label">¿Te sirvió esta receta?</p>
          <div className="rating-buttons">
            <button
              className={`btn btn-rate ${rating === "like" ? "active" : ""}`}
              onClick={() => onRate(recipe.id, rating === "like" ? null : "like")}
            >
              👍 Sí, me gustó
            </button>
            <button
              className={`btn btn-rate ${rating === "dislike" ? "active" : ""}`}
              onClick={() => onRate(recipe.id, rating === "dislike" ? null : "dislike")}
            >
              👎 No me gustó
            </button>
          </div>
        </div>

        <button className="btn btn-secondary omit-btn" onClick={handleOmit}>
          Omitir esta receta
        </button>
      </div>
    </div>
  );
}
