import { useState, useEffect } from "react";
import { getEmoji, getCategories } from "../data/ingredients";
import { isAllowedByDiet } from "../data/diets";

const TIME_OPTIONS = [
  { label: "Sin límite", value: 0 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "60 min", value: 60 },
];

const CATEGORIES = getCategories();

export default function PantrySelector({
  pantry,
  setPantry,
  maxCookTime,
  setMaxCookTime,
  onHungry,
  onProfile,
  profile,
}) {
  const [search, setSearch] = useState("");

  const toggleIngredient = (name) => {
    if (pantry.includes(name)) {
      setPantry(pantry.filter((i) => i !== name));
    } else {
      setPantry([...pantry, name]);
    }
  };

  const q = search.toLowerCase();

  const dietId = profile?.diet || "omnivore";

  useEffect(() => {
    if (dietId !== "omnivore") {
      const cleaned = pantry.filter((i) => isAllowedByDiet(i, dietId));
      if (cleaned.length !== pantry.length) {
        setPantry(cleaned);
      }
    }
  }, [dietId]);

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (i) =>
        i.includes(q) &&
        (dietId === "omnivore" || isAllowedByDiet(i, dietId))
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="view pantry-view">
      <header className="header">
        <div className="header-row">
          <h1>🥘 OptiMeal</h1>
          <button className="btn-profile" onClick={onProfile} title="Mi Perfil">
            ⚙️
          </button>
        </div>
        <p className="subtitle">Hola {profile?.name} 👋 — toca los ingredientes que tienes</p>
      </header>

      <button
        className="btn btn-primary hungry-btn"
        onClick={onHungry}
        disabled={pantry.length === 0}
      >
        ¡Tengo Hambre! ¿Qué cocino?
      </button>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar ingredientes..."
        className="input search-input"
      />

      <div className="chip-list">
        {pantry.length === 0 && (
          <p className="empty-msg">Ningún ingrediente seleccionado</p>
        )}
        {pantry.map((item) => (
          <span key={item} className="chip">
            <span>{getEmoji(item)}</span>
            <span>{item}</span>
            <button className="chip-x" onClick={() => toggleIngredient(item)}>
              ✕
            </button>
          </span>
        ))}
      </div>

      <div className="time-filter">
        <span className="time-label">⏱ Tiempo máximo:</span>
        <div className="time-options">
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`time-btn ${maxCookTime === opt.value ? "time-btn--on" : ""}`}
              onClick={() => setMaxCookTime(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filteredCategories.map((cat) => (
        <div key={cat.name} className="cat-section">
          <h3 className="cat-title">{cat.icon} {cat.name}</h3>
          <div className="ingredient-grid">
            {cat.items.map((name) => {
              const selected = pantry.includes(name);
              return (
                <button
                  key={name}
                  className={`grid-item ${selected ? "grid-item--on" : ""}`}
                  onClick={() => toggleIngredient(name)}
                >
                  <span className="grid-emoji">{getEmoji(name)}</span>
                  <span>{name}</span>
                </button>
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
