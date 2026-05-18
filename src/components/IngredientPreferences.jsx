import { useState } from "react";
import { getEmoji, getCategories } from "../data/ingredients";

const CATEGORIES = getCategories();

export default function IngredientPreferences({
  blocked,
  favorites,
  onToggleBlocked,
  onToggleFavorite,
  onGoBack,
}) {
  const [search, setSearch] = useState("");

  const q = search.toLowerCase();

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter((i) => i.includes(q)),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="view settings-view">
      <header className="header">
        <button className="btn btn-back" onClick={onGoBack}>
          ← Volver
        </button>
        <h1>⚙️ Preferencias</h1>
        <p className="subtitle">Personaliza tus ingredientes</p>
      </header>

      <div className="pref-legend">
        <div className="pref-legend-item">
          <span className="pref-legend-badge pref-legend-badge--fav">⭐</span>
          <span>
            <strong>Favorito</strong> — las recetas que lo incluyan subirán en el ranking
          </span>
        </div>
        <div className="pref-legend-item">
          <span className="pref-legend-badge pref-legend-badge--blocked">🚫</span>
          <span>
            <strong>No deseado</strong> — se oculta de la selección de ingredientes
          </span>
        </div>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar ingredientes..."
        className="input search-input"
      />

      {filteredCategories.map((cat) => (
        <div key={cat.name} className="cat-section">
          <h3 className="cat-title">
            {cat.icon} {cat.name}
          </h3>
          <div className="pref-list">
            {cat.items.map((name) => {
              const isFav = favorites.includes(name);
              const isBlocked = blocked.includes(name);
              return (
                <div
                  key={name}
                  className={`pref-item${isFav ? " pref-item--fav" : ""}${isBlocked ? " pref-item--blocked" : ""}`}
                >
                  <span className="pref-emoji">{getEmoji(name)}</span>
                  <span className="pref-name">{name}</span>
                  <div className="pref-toggles">
                    <button
                      className={`pref-toggle pref-toggle--fav${isFav ? " pref-toggle--active" : ""}`}
                      onClick={() => onToggleFavorite(name)}
                      title="Marcar como favorito"
                    >
                      ⭐
                    </button>
                    <button
                      className={`pref-toggle pref-toggle--blocked${isBlocked ? " pref-toggle--active" : ""}`}
                      onClick={() => onToggleBlocked(name)}
                      title="Marcar como no deseado"
                    >
                      🚫
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredCategories.length === 0 && (
        <p className="empty-msg">No se encontraron ingredientes</p>
      )}
    </div>
  );
}
